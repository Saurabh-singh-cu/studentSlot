import React, { useEffect, useState } from "react";
import useOnlineStatus from "./CommonComponent/useOnlineOffline";
import Spinner from "./CommonComponent/Spinner";
import Calandar from "./Calandar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState("");
  const [studentData, setStudentData] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>You are Offline</h1>;

  useEffect(() => {
    const storedAdminData = localStorage.getItem("adminData");
    if (storedAdminData) {
      const parseAdminData = JSON.parse(storedAdminData.trim());
      setAdminData(parseAdminData);
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useState(() => {
    const storeStudentData = localStorage.getItem("studentData");
    if (storeStudentData) {
      const parseStudentData = JSON.parse(storeStudentData.trim());
      setStudentData(parseStudentData);
      console.log(parseStudentData, "DATA");
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          <div className="home-wrap">
            <div className="wrapper-box">
              <h3>Hi {studentData?.user_name}</h3>
              <h2>
                Welcome to{" "}
                <span style={{ color: "#680000", fontWeight: "bold" }}>
                  Exam Slot Booking
                </span>{" "}
              </h2>
              <div class="frame">
                <Link to="/slot-book">
                  <button className="custom-btn btn-1">Book Slot</button>
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`question-mark-container ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="question-mark">&#63;</div>
            {isHovered && (
              <div className="contact-info">
                {/* Display your contact information here */}
                <p>Email: example@email.com</p>
                <p>Phone: +1 123-456-7890</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
