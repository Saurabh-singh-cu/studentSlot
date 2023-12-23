import axios from "axios";

export const fetchProgram = async () => {
  try {
    let config = {
      method: "get",
      url: "https://exam.unicornfortunes.com/exam_sch/api/program_level_list/",
      // url: "http://172.17.19.114:8080/exam_sch/api/user_table/create",
    };

    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Program Data");
    const updatedData = apiResponse?.data;
    console.log(updatedData, "PROGRAM");
    if (apiResponse?.status === 200) {
      console.log("SUCCESSSSS");
    }
    return apiResponse;
  } catch (error) {
    console.log(error, "PPP");
  }
};

// delete user

export const deleteUser = async (id) => {
  try {
    let config = {
      method: "delete",
      url: `https://exam.unicornfortunes.com/exam_sch/api/user_table/${id}/`,
    };

    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Delete");
    const updatedData = apiResponse?.data;
    console.log(updatedData);
    return apiResponse;
  } catch (error) {
    console.log(error, "PPP");
  }
};

// update user

export const updateUser = async (id, userData) => {
  try {
    let config = {
      method: "put",
      url: `https://exam.unicornfortunes.com/exam_sch/api/user_table/${id}/`,
      data: userData,
    };

    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Update");
    const updatedData = apiResponse?.data;
    console.log(updatedData);
    return apiResponse;
  } catch (error) {
    console.log(error, "Error updating user");
    throw error;
  }
};

// update student

// export const updateStudent = async (id, studentData) => {
//   try {
//     let config = {
//       method: "put",
//       url: `https://exam.unicornfortunes.com/exam_sch/api/studentenrollment_list/${id}`,
//       data: studentData,
//     };

//     const apiResponse = await axios(config);
//     console.log({ apiResponse }, "Update");
//     const updatedData = apiResponse?.data;
//     console.log(updatedData);
//     return apiResponse;
//   } catch (error) {
//     console.log(error, "Error updating user");
//     throw error;
//   }
// };

export const updateStudent = async (student_id, studentData) => {
  try {
    let config = {
      method: "put",
      url: `https://exam.unicornfortunes.com/exam_sch/api/studentenrollment_list/${student_id}`,
      data: studentData,
    };

    console.log("UpdateStudent Request:", config);

    const apiResponse = await axios(config);

    console.log("UpdateStudent Response:", apiResponse.data);

    return apiResponse.data; // Assuming your backend returns the updated data
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// delete student

export const deleteStudent = async (student_id) => {
  try {
    let config = {
      method: "delete",
      url: `https://exam.unicornfortunes.com/exam_sch/api/studentenrollment_list/${student_id}`,
    };

    const apiResponse = await axios(config);
    console.log({ apiResponse }, "Delete");
    const updatedData = apiResponse?.data;
    console.log(updatedData);
    return apiResponse;
  } catch (error) {
    console.log(error, "PPP");
  }
};
