import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupsOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
  password: "student123",
  student: {
    id: "123460",
    password: "student123",
    name: {
      firstName: "Mr. Student 2",
      middleName: "",
      lastName: "Good",
    },
    gender: "male",
    dateOfBirth: "2004-06-22",
    bloodGroup: "O-",

    email: "student2@example.com",
    contactNo: "321-123-4567",
    emergencyContactNo: "654-321-7890",
    presentAddress: "150 Main Street, Central City",
    permanentAddress: "400 Lake View Drive, Central City",

    guardian: {
      fatherName: "David Wilson",
      fatherOccupation: "Architect",
      fatherContactNo: "555-000-2222",
      motherName: "Emma Wilson",
      motherOccupation: "Artist",
      motherContactNo: "555-888-7777",
    },
    localGuardian: {
      name: "Christopher Reed",
      occupation: "Engineer",
      contactNo: "555-333-4444",
      address: "300 Forest Road, Central City",
    },

    admissionSemester: "676d9aa9e7fcbfac7182df64",
    academicDepartment: "676d97813edd028ca38e4fde",
  },
};

//! This is only for development
//! Should be removed
const studentDefaultValues = {
  name: {
    firstName: "Mr. Student 2",
    middleName: "Red",
    lastName: "Good",
  },
  gender: "male",
  //dateOfBirth: "2004-06-22",
  bloodGroup: "O-",

  email: "student2ef@example.com",
  contactNo: "321-123-4567",
  emergencyContactNo: "654-321-7890",
  presentAddress: "150 Main Street, Central City",
  permanentAddress: "400 Lake View Drive, Central City",

  guardian: {
    fatherName: "David Wilson",
    fatherOccupation: "Architect",
    fatherContactNo: "555-000-2222",
    motherName: "Emma Wilson",
    motherOccupation: "Artist",
    motherContactNo: "555-888-7777",
  },
  localGuardian: {
    name: "Christopher Reed",
    occupation: "Engineer",
    contactNo: "555-333-4444",
    address: "300 Forest Road, Central City",
  },

  // admissionSemester: "676d9aa9e7fcbfac7182df64",
  // academicDepartment: "676d97813edd028ca38e4fde",
};

const CreateStudent = () => {
  const [addStudent, { data, error, isError }] = useAddStudentMutation();

  //Academic Data
  console.log({ data, error, isError });
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);

  // skip use when semester data load than department data pause. after semester data load completed then department data pause release
  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(
    undefined,
    { skip: sIsLoading }
  );
  //console.log(dData);
  //

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //console.log(data);

    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    console.log(addStudent, formData);
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    addStudent(formData);

    // ! This is for development
    // ! Just for checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Data Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupsOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact Number"
              />
            </Col>
          </Row>

          <Divider>Local Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
