// Popup.js
import React from "react";
import { toast } from "react-toastify";

const Popup = () => {
  return (
    <div className="toast">
      <h2>Guidelines</h2>
      <ul>
       <p> Here is your session profile information, including details about your
        email, UID, and phone number. If there are any inaccuracies, please
        contact the provided number 7896541235 for assistance. Once you've
        verified your details, proceed to the next step of booking a slot by
        clicking the "Next" button. </p>
        {/* Add more dos and don'ts as needed */}
      </ul>
    </div>
  );
};

export default Popup;
