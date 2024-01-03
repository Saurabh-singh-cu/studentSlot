// Popup.js
import React from "react";
import { toast } from "react-toastify";

const Popup = () => {
  return (
    <div className="toast">
      <h2>Guidelines</h2>
      <ul>
        <p>
          {" "}
          Verify your session details, including name, email, phone number, UID,
          and so on. Report inaccuracies to{" "}
          <span style={{ color: "orange" }}>+9172 91XY Z895</span> or mail us{" "}
          <span style={{ color: "orange" }}>helpdesk@cumail.in</span> for
          assistance. After verification, proceed to book a slot by clicking{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>"Next"</span>.{" "}
        </p>
        {/* Add more dos and don'ts as needed */}
      </ul>
    </div>
  );
};

export default Popup;
