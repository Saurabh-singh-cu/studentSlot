import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(2 * 60 * 60); // 2 hours in seconds
  // const [timeRemaining, setTimeRemaining] = useState(20); // 2 hours in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      // Clear local storage
      localStorage.clear();

      // Redirect to /login
      window.location.href = "/login";
    }
  }, [timeRemaining]);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>
        Time Remaining: {hours}h {minutes}m {seconds}s
      </p>
    </div>
  );
};

export default CountdownTimer;
