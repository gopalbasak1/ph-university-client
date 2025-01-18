import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const facultyData = {
      name: data.name,
    };
    //console.log(facultyData);
    try {
      const result = (await addAcademicFaculty(facultyData)) as TResponse;
      if (result.error) {
        toast.error(result.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went  wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Faculty Name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
