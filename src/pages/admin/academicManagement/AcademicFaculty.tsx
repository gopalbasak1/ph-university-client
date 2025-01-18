import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

interface DataType {
  key: React.Key;
  name: string;
  serial: number;
}

const AcademicFaculty = () => {
  const [params, setParams] = useState(undefined);
  const { data: facultyData } = useGetAcademicFacultiesQuery(params);
  const tableData = facultyData?.data?.map(({ _id, name }, index) => ({
    key: _id,
    name,
    serial: index + 1, // Generate serial number
  }));

  // const nameFilters = tableData.map((item)=> ({
  //   text: item.name,
  //   value: item.name
  // }))

  const columns: TableColumnsType<DataType> = [
    {
      title: "Sl",
      dataIndex: "serial",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: tableData?.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      onFilter: (value, record) => record.name.includes(value),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log(extra, filters);
  };
  console.log(tableData);

  return (
    <div>
      <Table columns={columns} dataSource={tableData} onChange={onChange} />
    </div>
  );
};

export default AcademicFaculty;
