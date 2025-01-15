import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
//console.log(currentYear);
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
//console.log(yearOptions);

const CreateAcademicSemester = () => {
  //mutation always return array[]
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  // Submit Data
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    //console.log(data.name);
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const result = (await addAcademicSemester(semesterData)) as TResponse;
      if (result.error) {
        toast.error(result.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created successfully", { id: toastId });
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error("Something went  wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect options={semesterOptions} label="Name" name="name" />
          <PHSelect options={yearOptions} label="Year" name="year" />
          {/* Start Month */}
          <PHSelect
            options={monthOptions}
            label="Start Month"
            name="startMonth"
          />
          <PHSelect options={monthOptions} label="End Month" name="endMonth" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
