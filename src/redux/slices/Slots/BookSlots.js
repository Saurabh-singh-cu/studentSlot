import axios from "axios";
import swal from "sweetalert";

export const slotBook = async () => {
  try {
   
    let config = {
      method: "GET",
      url: "http://172.17.18.255:8080/exam_sch/api/slot-search/?subject_id=44&session_id=202401",
      
    };
   
    const apiResponse = await axios(config);
    console.log({ apiResponse }, "SLOT DETAILS FOR STUDENTS");

    if (apiResponse?.status === 201) {
      console.log("?");
      swal({
        title: "User Role Added!",
        text: ``,
        icon: "success",
        button: "Close",
      });
    } else {
    }
  } catch (error) {
    console.log(error, "QQQQ");
    swal({
      title: `${error?.response?.data?.role_name}`,
      text: "Something went wrong.",
      icon: "warning",
      button: "Close",
    });
  }
};
