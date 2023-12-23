import React from "react";
import { Alert, Spin } from "antd";
const Spinner = () => (
  <div className="example">
    <Spin size="large" tip="Loading...">
      {/* <Alert message="Take a deep breath!!!" description="" type="info" /> */}
    </Spin>
  </div>
);
export default Spinner;
