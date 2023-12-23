import axios from "axios";
import swal from "sweetalert";

export const PostEnrollStudent = async (
  studentName,
  studentUid,
  studentEmail,
  phoneNumber,
  sessionSelected,
  selectedProgramLevel,
  genderSelected,
  selectedCourses,
  selectedSemester,
  selectedSpecializations,
  selectedElectives
) => {
  try {
    let userData = {
      student_name: studentName,
      student_uid: studentUid,
      student_email: studentEmail,
      student_mobile: phoneNumber,
      session: sessionSelected,
      program_level: parseInt(selectedProgramLevel),
      gender: parseInt(genderSelected),
      program: parseInt(selectedCourses),
      semester: parseInt(selectedSemester),
    };


    // this is a function which conditionally send data of spec or elec if available 
    
    if (!!selectedSpecializations.length) {
      userData.spec = Array.isArray(selectedSpecializations)
        ? selectedSpecializations
        : [selectedSpecializations];
    }

    if (!!selectedElectives.length) {
      userData.elec = Array.isArray(selectedElectives)
        ? selectedElectives
        : [selectedElectives];
    }
    let config = {
      method: "post",
      // url: "https://exam.unicornfortunes.com/exam_sch/api/studentenrollment_list/",
      url: "http://172.17.18.255:8080/exam_sch/api/studentenrollment_list/",
      data: userData,
    };
    console.log(userData, "REDUX DATA AFTER");
    const apiResponse = await axios(config);
    console.log(apiResponse, "Enroll Student");

    if (apiResponse?.status === 201) {
      console.log("?");
      swal({
        title: "Enroll Success!",
        text: ``,
        icon: "success",
        button: "Close",
      });
    } else {
    }
  } catch (error) {
    console.log(error, "QQQQ");
    if (error?.status === 400) {
      swal({
        title: `${error?.response?.data?.non_field_errors}`,
        text: `Something went wrong!`,
        icon: "success",
        button: "Close",
      });
    } else if (error?.status === 500) {
      swal({
        title: `${error.message}`,
        text: "Something went wrong.",
        icon: "warning",
        button: "Close",
      });
    } else {
      swal({
        title: `${error.message}`,
        text: "Something went wrong.",
        icon: "warning",
        button: "Close",
      });
    }
  }
};
