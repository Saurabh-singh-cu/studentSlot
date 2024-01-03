// Popup.js
import React from "react";
import { toast } from "react-toastify";

const PopupTwo = () => {
  return (
    <div className="toast">
      <h2>Guidelines</h2>
      <ul>
        <p>
          {" "}
          Welcome to the slot booking page for your exams. Here, you can choose
          the <span style={{ color:"green"}}>available slots</span> for each subject, whether it's one, two, or more.
          Remember, you can only select <span style={{ color:"orange"}}>one slot for each subject</span>. Be sure to
          book slots for all subjects, including any specializations or
          electives. Once you've selected the slots for every subject or
          specialization/elective, carefully confirm your choices. Keep in mind
          that this <span style={{ color:"red"}}>process is irreversible</span>. If you're satisfied with your
          selections, press the 'Submit' button to finalize your slot bookings.
          Once submitted, your slots for the exams will be <span style={{ color:"green"}}>confirmed</span>."
        </p>
        {/* Add more dos and don'ts as needed */}
      </ul>
    </div>
  );
};

export default PopupTwo;
