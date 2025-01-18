import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  //console.log(params);
  return (
    <div>
      <h1>This is Student Details fo {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
