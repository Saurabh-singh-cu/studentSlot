import React from "react";

const CircleNameDisplay = ({ name }) => {
    if (!name) {
        return null;
      }
  const firstName = name.charAt(0);
  

  return (
    <div className="circle">
      <div className="circle-content">
        <span className="first-letter">{firstName}</span>
     
      </div>
    </div>
  );
};

export default CircleNameDisplay;
