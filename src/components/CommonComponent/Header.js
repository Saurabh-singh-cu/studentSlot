import React, { useEffect, useState } from "react";
import whitelogo from "../assets/images/brandlogo3.png";

import { Avatar, Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import CircleNameDisplay from "../CircleNameDisplay ";
import Spinner from "./Spinner";

const Header = () => {
  const [adminData, setAdminData] = useState(null);
  const [studentData, setStudentData] = useState("");
  const [loading, setLoading] = useState(false);

  const clearLocal = () => {
    window.location.reload();
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedAdminData = localStorage.getItem("adminData");

    if (storedAdminData) {
      const parseAdminData = JSON.parse(storedAdminData);
      setAdminData(parseAdminData);
    }
  }, []);

  useEffect(() => {
    const storeStudentData = localStorage.getItem("studentData");
    if (storeStudentData) {
      const parseStudentData = JSON.parse(storeStudentData.trim());
      setStudentData(parseStudentData);
    }
  }, []);

  const showHomeButton = location.pathname !== "/login";

  const items = [
    {
      key: "2",
      label: (
        <Link className="link-name" to="/">
          {" "}
          <span> Profile </span> <span style={{ marginRight: "10px" }}></span>
          <UserOutlined />
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link onClick={clearLocal} className="link-name" to="/login">
          {" "}
          <span>Logout</span>
          <span style={{ marginRight: "10px" }}></span>
          <LogoutOutlined />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="header-top">
        <div className="header-body">
          <div>
            <img src={whitelogo} className="brandlogo" alt="brandlogo" />
          </div>
          {loading === true ? (
            <Spinner />
          ) : (
            <>
              {" "}
              <div className="login">
                <Space direction="vertical">
                  <Space wrap>
                    {showHomeButton && (
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottomLeft"
                      >
                        <Button className="login-btn">
                          {studentData?.user_name}
                          <Space direction="vertical" size={16}>
                            <Space wrap size={14}>
                              <Avatar
                                size={50}
                                icon={
                                  <CircleNameDisplay
                                    name={studentData?.user_name}
                                  />
                                }
                              />
                            </Space>
                          </Space>
                        </Button>
                      </Dropdown>
                    )}
                  </Space>
                </Space>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
