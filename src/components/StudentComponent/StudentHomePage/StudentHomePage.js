import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";
import { Avatar, Space } from "antd";

import Spinner from "../../CommonComponent/Spinner";
import Popup from "../../CommonComponent/Popup";
import CircleSpinner from "../../CommonComponent/CircleSpinner";

import "react-toastify/dist/ReactToastify.css";

const StudentHomePage = () => {
  const [loading, setLoading] = useState(false);
  const [circleLoading, setCircleLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const customColors = ["#BF3131"];

  const location = useLocation();
  console.log(location, "LOCATION");

  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  // subjects data

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          "http://172.17.18.255:8080/exam_sch/api/subject-search/?program_id=1&semester_id=3"
        );

        console.log("Subject Response Status:", response.status);

        if (response.ok) {
          const subjectData = await response.json();
          console.log("Subjects API Response:", subjectData);

          // Access the subjects array using subjectData.subjects
          if (Array.isArray(subjectData.subjects)) {
            setSubjects(subjectData.subjects);
          } else {
            console.error(
              "Subjects data is not an array:",
              subjectData.subjects
            );
          }
        } else {
          console.error("Server response not okay for subjects");
        }
      } catch (error) {
        console.error("Error fetching or processing subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // getting student data

  useState(() => {
    const storeStudentData = localStorage.getItem("studentData");
    if (storeStudentData) {
      const parseStudentData = JSON.parse(storeStudentData.trim());
      setStudentData(parseStudentData);
      console.log(parseStudentData, "DATA-Student");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCircleLoading(true);
        const storeStudentData = localStorage.getItem("studentData");

        console.log("Stored Student Data:", { storeStudentData });

        let studentEmail = "";
        if (storeStudentData) {
          let parseStudentData;
          try {
            parseStudentData = JSON.parse(storeStudentData);
          } catch (error) {
            console.error("Error parsing student data:", error);
          }

          console.log(parseStudentData, "DATA-Student");

          // Check if parseStudentData has the expected structure
          if (parseStudentData && parseStudentData.user_email) {
            setStudentData(parseStudentData);
            studentEmail = parseStudentData.user_email;
          } else {
            console.error("Invalid student data structure:", parseStudentData);
          }
        } else {
          console.error("No student data found in local storage");
        }

        // Fetch data from the server
        const response = await fetch(
          // `http://172.17.18.255:8080/exam_sch/api/studentenrollment-session-search/?student_email=${studentEmail}&session_id=202401`
          `https://exam.unicornfortunes.com/exam_sch/api/studentenrollment-session-search/?student_email=${studentEmail}&session_id=202401`
        );

        console.log("Response Status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);

          if (data && data.length > 0) {
            setStudentData(data[0]);
            setCircleLoading(false);
          } else {
            console.error("No data received from the server");
          }
        } else {
          console.error("Server response not okay");
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   // Display the popup on page load
  //   toast(<Popup />, {
  //     position: "bottom-center",
  //     autoClose: false,
  //     closeOnClick: true,
  //     draggable: true,
  //   });
  // }, []);

  // ...

  useEffect(() => {
    // Display the popup on page load with a delay of 5 seconds
    const delay = 5000;
    const timeoutId = setTimeout(() => {
      toast(<Popup />, {
        position: "bottom-center",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        backgroundColor: "red",
      });
    }, delay);

    // Clear the timeout if the component unmounts or when the effect is re-run
    return () => clearTimeout(timeoutId);
  }, []);

  // ...

  if (!studentData) {
    return <p>Loading...</p>;
  }

  const navigateToMinusOne = () => {
    navigate(-1);
  };

  return (
    <>
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          {" "}
         
          <ToastContainer />
          <div className="slot-container">
            <div className="container">
              <div className="title" style={{ color: "#680000" }}>
                Your Profile{" "}
                <span>
                  {" "}
                  <Avatar
                    style={{
                      backgroundColor: "#680000",
                    }}
                    icon={<UserOutlined />}
                  />
                </span>
                <span style={{ float: "right" }}>
                <div style={{ cursor: "pointer", fontSize:"15px" }} onClick={navigateToMinusOne}>
              {"<--"} Back
            </div>
                </span>
              </div>

              <form action="#">
                <div className="user__details">
                  <div className="input__box">
                    <span className="details">Student Name</span>
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.student_name}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">Email</span>
                    {/* <input
                      type="email"
                      value={studentData?.student_email}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.student_email}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">UID</span>
                    {/* <input
                      type="text"
                      value={studentData?.student_uid}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.student_uid}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>

                  <div className="input__box">
                    <span className="details">Phone Number</span>
                    {/* <input
                      type="text"
                      value={studentData?.student_mobile}
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.student_mobile}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">Gender</span>
                    {/* <input
                      type="text"
                      value={studentData?.gender_name}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.gender_name}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">Session</span>
                    {/* <input
                      type="text"
                      value={studentData?.session}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.session}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">Program Level</span>
                    {/* <input
                      type="text"
                      value={studentData?.prog_level_name}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.prog_level_name}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">Course</span>
                    {/* <input
                      type="text"
                      value={studentData?.program_name}
                      readOnly
                      id="courses"
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.program_name}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details">Semester</span>
                    {/* <input
                      type="text"
                      value={studentData?.semester_name}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    /> */}
                    <input
                      type="text"
                      // value={studentData?.student_name}
                      value={circleLoading ? "" : studentData?.semester_name}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                    {circleLoading && <CircleSpinner />}
                  </div>
                  <div className="input__box">
                    <span className="details"> Book Slot </span>
                    <Link to="/book-slot">
                      <button> Next </button>
                    </Link>
                  </div>
                </div>

                <div className="button">
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>

          <div className="helpBox">
          <Space wrap>
            {customColors.map((color) => (
              <Tooltip
              className="title"
                placement="top"
                title=" Verify your session details, including name, email, phone number, UID and so on. Report
                    inaccuracies to +9172 91XY Z895 or mail us at helpdesk@cumail.in for assistance. After verification, proceed
                    to book a slot by clicking "
                color={color}
                key={color}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            ))}
          </Space>
          </div>
        
        </>
      )}
    </>
  );
};
export default StudentHomePage;
