import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

export const AddUserManual = async (userRole, userName, userEmail, genderOptions, userStatus, userPassword) => {
  

  try {
    
    let userData = {
        user_role: parseInt(userRole),
        user_name: userName,
        user_email : userEmail ,
        user_gender : genderOptions,
        status : userStatus,
        user_password : userPassword
    };

    console.log(userData, "REDUX DATA")

    let config = {
      method: "post",
      url: "https://exam.unicornfortunes.com/exam_sch/api/user_table/create",
      // url: "http://172.17.19.114:8080/exam_sch/api/user_table/create",
      data: userData,
    };
    console.log(userData?.results, "User Data here!!!")
    const apiResponse = await axios(config);
    console.log({ apiResponse }, "create user");
    console.log(apiResponse?.data?.user_name, "USER_NAMED")
    if (apiResponse?.status === 201) {
      console.log("?")
      swal({
        title: "User Created Success",
        text: ``,
        icon: "success",
        button: "Close",
      });

      // window.location.href = "/";
    } else {
    }
  } catch (error) {
    console.log(error, "QQQQ")
    swal({
      title: "Something Wrong!!",
      text: error?.message,
      icon: "warning",
      button: "Close",
    });

    if (error.response?.status === 404) {
      console.log(error.response, "ERROR");
      swal({
        title: `${error.response?.data?.message}`,
        text: "Something went wrong.",
        icon: "warning",
        button: "Close",
      });
    } else if (error.response?.status === 401) {
      swal({
        title: `${error.response?.data?.message}`,
        text: "Something went wrong.",
        icon: "warning",
        button: "Close",
      });
    } else if (error.response?.status === 400) {
        swal({
          title: `${error.response?.statusText}`,
          text: "Oops Bad Request ",
          icon: "warning",
          button: "Close",
        });
    }
     else {
      swal({
        title: `${error.response?.data?.message}`,
        text: "Something went wrong.",
        icon: "warning",
        button: "Close",
      });
      
    } 
   
  }
};
