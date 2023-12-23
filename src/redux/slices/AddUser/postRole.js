import axios from "axios";
import swal from "sweetalert";

export const postRole = async (roleName, isStatus) => {
  try {
    let userData = {
        role_name: roleName,
        Status: isStatus,
    };
    let config = {
      method: "post",
      url: "https://exam.unicornfortunes.com/exam_sch/api/roles_create/",
      data: userData,
    };
    console.log(userData, "REDUX DATA AFTER");
    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Enroll Student");

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
