import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../CommonComponent/Spinner";
import TableSimmerUi from "../../CommonComponent/TableSimmerUi";
import { slotBook } from "../../../redux/slices/Slots/BookSlots";

const SubjectSlot = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlotsAndSubject = async () => {
      setLoading(true);
      try {
        // Replace the hardcoded email and session with your actual values
        const requestBody = {
          email: "ankush@gmail.com",
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
            // Initialize selectedSubjects state with an empty object for each subject
            const initialSelectedSubjects = {};
            slotData.forEach((subject) => {
              initialSelectedSubjects[subject.subject_id] = null;
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

  const buttonClick = () => {
    slotBook();
  };

  const handleCheckboxChange = (subjectId, slot) => {
    // Update the selectedSubjects state to keep track of the selected slot for each subject
    setSelectedSubjects((prevSelectedSubjects) => ({
      ...prevSelectedSubjects,
      [subjectId]: slot,
    }));
  };

  return (
    <div>
      <div className="slot-container">
        <div
          style={{ marginTop: "113px", padding: "30px", width: "100vw" }}
          className="subject-tabl"
        >
          <div className="two-side">
            <div>
              <h2>Subjects</h2>
            </div>
            <div style={{ cursor: "pointer" }} onClick={navigateToMinusOne}>
              {"<--"} Back
            </div>
          </div>

          {loading === true ? (
            <TableSimmerUi />
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>Subject Code</th>
                    <th style={{ width: "200px" }}>Subject Name</th>
                    <th>Available Slots</th>
                  </tr>
                </thead>

                {/* <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.subject_id}>
                      <td style={{ width: "100px" }}>{subject.subject_code}</td>
                      <td style={{ width: "200px" }}>{subject.subject_name}</td>
                      <td>
                        <div className="slots">
                          <div className="slots-contain">
                            <p>
                              {subject?.slot_list
                                .split(",")
                                .map((slot, index) => (
                                  <span key={index}>
                                    {slot.trim()}{" "}
                                    <input
                                      type="radio"
                                      name={`slot_${subject.subject_id}`}
                                      onChange={() =>
                                        handleCheckboxChange(
                                          subject.subject_id,
                                          `slot${index + 1}`
                                        )
                                      }
                                      checked={
                                        selectedSubjects[subject.subject_id] ===
                                        `slot${index + 1}`
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
                </tbody> */}
                {/* ... (other imports and code remain unchanged) */}

                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.subject_id}>
                      <td style={{ width: "100px" }}>{subject.subject_code}</td>
                      <td style={{ width: "200px" }}>{subject.subject_name}</td>
                      <td>
                        <div className="slots">
                          <div className="slots-contain">
                            <p>
                              {subject?.slot_list
                                .split(",")
                                .filter(Boolean)
                                .map((slot, index) => (
                                  <span
                                    className={
                                      selectedSubjects[subject.subject_id] ===
                                      `slot${index + 1}`
                                        ? "this-is-slot"
                                        : "this-is-not-slot"
                                    }
                                    key={index}
                                  >
                                    {slot.trim()}{" "}
                                    <input
                                      style={{ marginLeft: "10px" }}
                                      type="radio"
                                      name={`slot_${subject.subject_id}`}
                                      onChange={() =>
                                        handleCheckboxChange(
                                          subject.subject_id,
                                          `slot${index + 1}`
                                        )
                                      }
                                      checked={
                                        selectedSubjects[subject.subject_id] ===
                                        `slot${index + 1}`
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

                {/* ... (remaining code remains unchanged) */}
              </table>
              <div className="button">
                <button type="submit">Submit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectSlot;
