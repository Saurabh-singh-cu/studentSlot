import axios from "axios";

export const postGender = async (genderName) => {
  try {
    let userGender = {
      gender_name: genderName,
      gender_status: "active"
    };

    let config = {
      method: "post",
      url: "https://exam.unicornfortunes.com/exam_sch/api/genders_create/",
      data: userGender,
    };

    const apiResponse = await axios(config);
    if (apiResponse?.status === 201) {
      console.log("?");
      swal({
        title: "Session Added",
        text: ``,
        icon: "success",
        button: "Close",
      });
    } else {
    }
  } catch (error) {
    console.log(error, "GGGG");
    swal({
      title: `${error?.code}`,
      text: `${error?.message}`,
      icon: "warning",
      button: "Close",
    });
  }
};
