import axios from "axios";
import swal from "sweetalert";

export const postSemester = async (semesterID, semesterName) => {
  try {
    let userData = {
      semester_id: parseInt(semesterID),
      semester_name: semesterName,
    };
    let config = {
      method: "post",
      url: "https://exam.unicornfortunes.com/exam_sch/api/semester_list/",
      data: userData,
    };
    console.log(userData, "REDUX DATA AFTER");
    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Enroll Student");

    if (apiResponse?.status === 201) {
      console.log("?");
      swal({
        title: "Semester Added!",
        text: ``,
        icon: "success",
        button: "Close",
      });
    } else {
    }
  } catch (error) {
    console.log(error, "QQQQ");
    swal({
      title: `${error?.code}`,
      text: `${error?.response?.data?.semester_name}`,
      icon: "warning",
      button: "Close",
    });
  }
};
