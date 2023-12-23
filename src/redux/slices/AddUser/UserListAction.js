// user list api here 

import axios from "axios";
import swal from "sweetalert";

export const UserListView = async () => {
  try {
    let config = {
      method: "get",
      url: "https://exam.unicornfortunes.com/exam_sch/api/user_table/create",
      // url: "http://172.17.19.114:8080/exam_sch/api/user_table/create",
      
    };
    console.log(userData, "REDUX DATA AFTER");
    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Users Lists");
  } catch (error) {
    console.log(error, "QQQQ");
    swal({
      title: "Something Wrong!!",
      text: error?.message,
      icon: "warning",
      button: "Close",
    });
  }
};
