import React from "react";

const Loading = () => {
  return (
    <>
      <div className="container">
        <div className="i-loader-inf-horizontal-container">
          <div className="i-loader-inf-horizontal"></div>
          <div className="pt-8px">
            <span>Adding User...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
