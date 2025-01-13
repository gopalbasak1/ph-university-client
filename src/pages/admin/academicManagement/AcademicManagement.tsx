import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicManagement = () => {
  const { data } = useGetAllSemesterQuery(undefined);

  console.log(data);

  return <div>academic semester</div>;
};

export default AcademicManagement;
