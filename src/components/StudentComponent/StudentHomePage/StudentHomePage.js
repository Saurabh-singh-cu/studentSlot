import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import Spinner from "../../CommonComponent/Spinner";
import { Avatar, Space } from "antd";
import { ConfigProvider } from "antd";
import { useLocation } from "react-router-dom";

const StudentHomePage = () => {
  const location = useLocation();
  console.log(location, "LOCATION");

  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);

  // getting student data

  useState(() => {
    const storeStudentData = localStorage.getItem("studentData");
    if (storeStudentData) {
      const parseStudentData = JSON.parse(storeStudentData.trim());
      setStudentData(parseStudentData);
      console.log(parseStudentData, "DATA-Student");
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          `http://172.17.18.255:8080/exam_sch/api/studentenrollment-session-search/?student_email=${studentEmail}&session_id=202401`
        );

        console.log("Response Status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);

          if (data && data.length > 0) {
            setStudentData(data[0]);
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

  if (!studentData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <h1>Hello</h1>
          <div className="slot-container">
            <div className="container">
              <div className="title" style={{ color: "#680000" }}>
                Your Profile{" "}
                <span>
                  {" "}
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                </span>
              </div>

              <form action="#">
                <div className="user__details">
                  <div className="input__box">
                    <span className="details">Student Name</span>
                    <input
                      type="text"
                      value={studentData.student_name}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Email</span>
                    <input
                      type="email"
                      value={studentData.student_email}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">UID</span>
                    <input
                      type="text"
                      value={studentData.student_uid}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Phone Number</span>
                    <input
                      type="text"
                      value={studentData.student_mobile}
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Gender</span>
                    <input
                      type="text"
                      value={studentData.gender_name}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Session</span>
                    <input
                      type="text"
                      value={studentData.session}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Program Level</span>
                    <input
                      type="text"
                      value={studentData.prog_level_name}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Course</span>
                    <input
                      type="text"
                      value={studentData.program_name}
                      readOnly
                      id="courses"
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                  <div className="input__box">
                    <span className="details">Semester</span>
                    <input
                      type="text"
                      value={studentData.semester_name}
                      readOnly
                      style={{ cursor: "no-drop" }}
                      disabled
                    />
                  </div>
                </div>

                <div className="button">
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default StudentHomePage;
