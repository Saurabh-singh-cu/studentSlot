import { message } from "antd";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export const LoginManual = async (user_email, user_password, dispatch, onSuccessCallback) => {
  try {
    let data = {
      user_email: user_email,
      user_password: user_password,
    };

    let config = {
      method: "post",
      // url: "https://exam.unicornfortunes.com/exam_sch/api/login",
      url: "http://172.17.18.255:8080//exam_sch/api/login",
      data,
    };
    const apiResponse = await axios(config);
    console.log(apiResponse, "API RESPONSE LOGIN");

    if (apiResponse?.status === 200) {
      if (apiResponse?.data && apiResponse?.data?.user_role_id === 3) {
        // Only allow users with user_role_id === 3 to proceed
        swal({
          title: `${apiResponse?.data?.message}`,
          text: `${apiResponse?.data?.message}`,
          icon: "success",
          button: "Close",
        });

        // ... (your existing code)

        window.location.href = "/";
      } else {
        // Show an error message for users with user_role_id other than 3
        swal({
          title: "Access Denied",
          text: "You do not have permission to access this resource.",
          icon: "error",
          button: "Close",
        });
      }


      // message.success(apiResponse?.data?.message);
      let localStorageObj = {
        accessToken: apiResponse?.data?.access,
        roleId: apiResponse?.data?.user_role_id,
        userId: apiResponse?.data?.user_id,
        userName: apiResponse?.data?.user_name,
      };
      localStorage.setItem("slotbook", JSON.stringify(localStorageObj));

      if (
        apiResponse?.data?.user_role_id === 1 ||
        apiResponse?.data?.user_role_id === 2
      ) {
        localStorage.setItem("adminData", JSON.stringify(apiResponse?.data));
      } else {
        localStorage.setItem("studentData", JSON.stringify(apiResponse?.data));
      }

      if (apiResponse?.data && apiResponse?.data?.user_role_id === 3) {
        // onSuccessCallback(apiResponse.data.user_email);
        window.location.href = "/";
      } else if (
        (apiResponse?.data && apiResponse?.data?.user_role_id === 1) ||
        (apiResponse?.data && apiResponse?.data?.user_role_id === 2)
      ) {
      
      } else {
        window.location.href = "/login";
        // navigate("/login");
      }
    }
  } catch (error) {
    swal({
      title: `${error.response?.data?.message || "Something went wrong."}`,
      text: "Something went wrong.",
      icon: "warning",
      button: "Close",
    });
  }
};

const checkLoggedIn = () => {
  const localStorageObj = JSON.parse(localStorage.getItem("slotbook"));
  if (!localStorageObj || !localStorageObj.accessToken) {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
};

checkLoggedIn();
