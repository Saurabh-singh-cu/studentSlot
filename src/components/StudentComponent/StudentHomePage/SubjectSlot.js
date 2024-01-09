import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import TableSimmerUi from "../../CommonComponent/TableSimmerUi";
import PopupTwo from "../../CommonComponent/PopupTwo";

const SubjectSlot = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState();
  const [totalSlotsCount, setTotalSlotsCount] = useState(0);

  const navigate = useNavigate();
  const customColors = ["#BF3131"];
  useEffect(() => {
    const fetchSlotsAndSubject = async () => {
      setLoading(true);
      try {
        const storedStudentData = localStorage.getItem("studentData");

        let userEmail = "";

        if (storedStudentData) {
          let ParseStudentData;
          try {
            ParseStudentData = JSON.parse(storedStudentData);
            console.log(ParseStudentData, "PPPPPPPPPPPP");
          } catch (error) {
            console.log(error);
          }

          if (ParseStudentData && ParseStudentData.user_email) {
            setStudentData(ParseStudentData);
            userEmail = ParseStudentData.user_email;
          }
          console.log({ userEmail }, "UUUUUUUWWWW");
        } else {
          console.log("Error");
        }

        const requestBody = {
          email: userEmail,
          session: 202401,
        };

        const response = await fetch(
          "http://172.17.18.255:8080/exam_sch/api/get_subjects_and_slots",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.ok) {
          const slotData = await response.json();
          console.log("Subjects Slots API Response:", slotData);

          if (Array.isArray(slotData)) {
            setSubjects(slotData);

            const totalSlots = slotData.reduce((count, subject) => {
              return (
                count + subject.slot_list.split(",").filter(Boolean).length
              );
            }, 0);
            setTotalSlotsCount(totalSlots);

            const initialSelectedSubjects = {};
            slotData.forEach((subject) => {
              initialSelectedSubjects[subject.subject_id] = "";
            });
            setSelectedSubjects(initialSelectedSubjects);
          } else {
            console.error("Subjects data is not an array:", slotData);
          }
        } else {
          console.error("Server response not okay for subjects");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or processing subjects:", error);
        setLoading(false);
      }
    };

    fetchSlotsAndSubject();
  }, []);

  const navigateToMinusOne = () => {
    navigate(-1);
  };

  const handleCheckboxChange = (subjectId, slot) => {
    setSelectedSubjects((prevSelectedSubjects) => ({
      ...prevSelectedSubjects,
      [subjectId]: slot,
    }));
  };

  useEffect(() => {
    const delay = 5000;
    const timeoutId = setTimeout(() => {
      toast(<PopupTwo />, {
        position: "bottom-center",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        backgroundColor: "red",
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSlotSubmission = (e) => {
    e.preventDefault();
    alert("Submitted Successfully!");
  };

  return (
    <div>
      <ToastContainer />
      <div className="slot-container">
        {/* <form className="slot-container"  onSubmit={handleSlotSubmission}> */}
        <div
          style={{ marginTop: "113px", padding: "30px", width: "100vw" }}
          className="subject-tabl"
        >
          <div className="two-side">
            <div>
              <h2>Subjects</h2>
              <p>Total Slots: {totalSlotsCount}</p>
            </div>
            <div style={{ cursor: "pointer" }} onClick={navigateToMinusOne}>
              {"<--"} Back
            </div>
          </div>

          {loading === true ? (
            <TableSimmerUi />
          ) : (
            <>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>Subject Code</th>
                    <th style={{ width: "200px" }}>Subject Name</th>
                    <th>Available Slots </th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.subject_id}>
                      <td>{subject.subject_code}</td>
                      <td>{subject.subject_name}</td>
                      <td>
                        <div className="slots">
                          <div className="slots-contain">
                            <p>
                              {subject?.slot_list
                                .split(",")
                                .filter(Boolean)
                                .map((slot, slotIndex) => (
                                  <span
                                    key={slotIndex}
                                    className={
                                      selectedSubjects[subject.subject_id] ===
                                      `slot${slotIndex + 1}`
                                        ? "this-is-slot"
                                        : "this-is-not-slot"
                                    }
                                  >
                                    {`Slot ${slotIndex + 1}: ${slot.trim()}`}{" "}
                                    <input
                                      type="radio"
                                      name={`slot_${subject.subject_id}`}
                                      onChange={() =>
                                        handleCheckboxChange(
                                          subject.subject_id,
                                          `slot${slotIndex + 1}`
                                        )
                                      }
                                      checked={
                                        selectedSubjects[subject.subject_id] ===
                                        `slot${slotIndex + 1}`
                                      }
                                    />
                                  </span>
                                ))}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
                className="button"
              >
                <button style={{ width: "400px" }} type="submit">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SubjectSlot;
