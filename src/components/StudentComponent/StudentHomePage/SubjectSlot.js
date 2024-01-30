import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import TableSimmerUi from "../../CommonComponent/TableSimmerUi";
import PopupTwo from "../../CommonComponent/PopupTwo";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const SubjectSlot = () => {
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [totalSlotsCount, setTotalSlotsCount] = useState(0);
  const [elecSpec, setElecSpec] = useState([]);
  const [selectedElectives, setSelectedElectives] = useState([]);
  const navigate = useNavigate();

  // fetch subject

  const fetchSlotsAndSubject = async () => {
    setLoading(true);
    try {
      const storedStudentData = localStorage.getItem("studentData");

      let userEmail = "";

      if (storedStudentData) {
        let ParseStudentData;
        try {
          ParseStudentData = JSON.parse(storedStudentData);
          // console.log(ParseStudentData, "PPPPPPPPPPPP");
        } catch (error) {
          console.log(error);
        }

        if (ParseStudentData && ParseStudentData.user_email) {
          setStudentData(ParseStudentData);
          userEmail = ParseStudentData.user_email;
        }
        // console.log({ userEmail }, "UUUUUUUWWWW");
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
            return count + subject.slot_list.split(",").filter(Boolean).length;
          }, 0);
          setTotalSlotsCount(totalSlots);

          const initialSelectedSubjects = {};
          slotData.forEach((subject) => {
            initialSelectedSubjects[subject.subject_id] = "";
          });
          setSelectedElectives(initialSelectedSubjects);
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

  // fetch elect/Spec

  const fetchElecSpec = async () => {
    const storedStudentData = localStorage.getItem("studentData");
    let userEmail = "";
    if (storedStudentData) {
      let ParseStudentData;
      try {
        ParseStudentData = JSON.parse(storedStudentData);
        // console.log(ParseStudentData, "PPPPPPPPPPPP");
      } catch (error) {
        console.log(error);
      }

      if (ParseStudentData && ParseStudentData.user_email) {
        setStudentData(ParseStudentData);
        userEmail = ParseStudentData.user_email;
      }
      // console.log({ userEmail }, "UUUUUUUWWWW");
    } else {
      console.log("Error");
    }

    const requestBodySpecElec = {
      email: "Banraksh@gmail.com",
      // email: userEmail,
      session: 202401,
    };

    const response = await fetch(
      "http://172.17.18.255:8080/exam_sch/api/get_electives_and_slots",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBodySpecElec),
      }
    );
    const result = await response.json();
    setElecSpec(result?.slots);
    console.log(result, "RESULT");
    try {
      if (response.status === 400) {
        swal({
          title: `${result?.error}`,
          text: `Warning`,
          icon: "warning",
          button: "Close",
        });
      }
    } catch (error) {
      swal({
        title: `${result?.error}`,
        text: `Warning`,
        icon: "error",
        button: "Close",
      });
    }
  };

  useEffect(() => {
    fetchSlotsAndSubject();
    fetchElecSpec();
  }, []);

  const navigateToMinusOne = () => {
    navigate(-1);
  };

  useEffect(() => {
    const delay = 9000;
    const timeoutId = setTimeout(() => {
      toast(<PopupTwo />, {
        position: "bottom-center",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSlotSelection = (subjectId, slot) => {
    setSelectedSubjects((prevSelectedSubjects) => ({
      ...prevSelectedSubjects,
      [subjectId]: slot,
    }));
  };

  const handleElectiveSelection = (elecCode, slot) => {
    setSelectedElectives((prevSelectedElectives) => ({
      ...prevSelectedElectives,
      [elecCode]: slot,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  const validationSchema = Yup.object().shape({
    // Add validation rules if needed
  });

  return (
    <div>
      <ToastContainer />
      <div className="slot-container">
        <Formik
          initialValues={{ selectedSubjects, selectedElectives }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            // <Form>
              <div
                style={{ marginTop: "113px", padding: "30px", width: "90vw" }}
                className="subject-tabl"
              >
                <div className="two-side">
                  <div>
                    <h2>Subjects</h2>
                    <p>Total Slots: {totalSlotsCount}</p>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={navigateToMinusOne}
                  >
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
                          <th style={{ width: "300px" }}>Subject Code</th>
                          <th style={{ width: "300px" }}>Subject Name</th>
                          <th style={{ width: "300px" }}>Available Slots </th>
                        </tr>
                      </thead>

                      <tbody>
                        {subjects.map((subject) => (
                          <tr key={subject.slot_id}>
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
                                            selectedSubjects[
                                              subject.slot_id
                                            ] === `slot${slotIndex + 1}`
                                              ? "this-is-slot"
                                              : "this-is-not-slot"
                                          }
                                        >
                                          {`Slot ${
                                            slotIndex + 1
                                          }: ${slot.trim()}`}{" "}
                                          <input
                                            type="checkbox"
                                            value={`slot${slotIndex + 1}`}
                                            name={`subject_${subject?.slot_id}_slot`}
                                            checked={
                                              selectedSubjects[
                                                subject.slot_id
                                              ] === `slot${slotIndex + 1}`
                                            }
                                            onChange={() =>
                                              handleSlotSelection(
                                                subject.slot_id,
                                                `slot${slotIndex + 1}`
                                              )
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

                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th style={{ width: "300px" }}>
                            Elective/Specilazation Code
                          </th>
                          <th style={{ width: "300px" }}>
                            Elective/Specilazation Name
                          </th>
                          <th style={{ width: "300px" }}>Available Slots </th>
                        </tr>
                      </thead>

                      <tbody>
                        {elecSpec &&
                          elecSpec.map((item) => (
                            <tr key={item.slot_id}>
                              <td>{item.subject_code}</td>
                              <td>{item.subject_name}</td>

                              <td>
                                <div className="slots">
                                  <div className="slots-contain">
                                    <p>
                                      {item?.slot_list
                                        .split(",")
                                        .filter(Boolean)
                                        .map((slot, slotIndex) => (
                                          <span
                                            key={slotIndex}
                                            className={
                                              selectedElectives[
                                                item.subject_code
                                              ] === `slot${slotIndex + 1}`
                                                ? "this-is-slot"
                                                : "this-is-not-slot"
                                            }
                                          >
                                            {`Slot ${
                                              slotIndex + 1
                                            }: ${slot.trim()}`}{" "}
                                            <input
                                              type="checkbox"
                                              value={`slot${slotIndex + 1}`}
                                              name={`slot_${item.subject_code}`}
                                              checked={
                                                selectedElectives[
                                                  item.subject_code
                                                ] === `slot${slotIndex + 1}`
                                              }
                                              onChange={() =>
                                                handleElectiveSelection(
                                                  item.subject_code,
                                                  `slot${slotIndex + 1}`
                                                )
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
                      <button
                        style={{ width: "400px" }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>
            // </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubjectSlot;
