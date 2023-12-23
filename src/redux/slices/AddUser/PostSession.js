import axios from "axios";

export const postSession = async (startYear, endYear, startMonth,endMonth,) => {
  try {
    let sessionData = {
        start_year: parseInt(startYear),
        end_year: parseInt(endYear),
        start_month: startMonth,
        end_month: endMonth,
    };

    let config = {
      method: "post",
      url: "https://exam.unicornfortunes.com/exam_sch/api/sessions_list/",
      data: sessionData,
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
      console.log(error, "QQQQ");
      swal({
        title: `${error?.code}`,
        text:  `${error?.message}`,
        icon: "warning",
        button: "Close",
      });
    }
  };
  