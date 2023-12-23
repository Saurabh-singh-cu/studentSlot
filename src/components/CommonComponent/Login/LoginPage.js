import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { ConfigProvider, message, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import longlogo from "../../assets/images/loginimg.jpg";
import longlogo2 from "../../assets/images/longlogo.png";
import { LoginManual } from "../../../redux/slices/authentication/authSliceAction";
import Spinner from "../Spinner";
import  {SmtpAction}  from "../../../redux/slices/ForgetPassword/smtpAction";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ smtpAction }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [user_email, setUserEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [userNameValidation, setUserNameValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);

  const [to, setTo] = useState("");


  const fetchData = async (userEmail) => {
    try {
      const response = await fetch(
        `http://172.17.18.255:8080/exam_sch/api/studentenrollment-session-search/?student_email=${userEmail}&session_id=202401`
      );
      const data = await response.json();
      setStudentData(data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await LoginManual(user_email, user_password, dispatch, (userEmail) => {
        // Fetch data using the user email
        fetchData(userEmail);
        navigate("/slot-book", { state: { userEmail } });
      });
      const currentTimestamp = new Date().toISOString();
      localStorage.setItem("lastLogin", currentTimestamp);
      // navigate("/slot-book", { state: { userEmail: user_email } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_email) {
      fetchData(user_email);
    }
  }, [user_email]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };



  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await SmtpAction({ to: to.toLowerCase() });
      // alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Space>
            <Radio.Group value={placement} onChange={onChange}></Radio.Group>
          </Space>
          <Drawer
            title="Reset Password"
            placement={placement}
            width={500}
            onClose={onClose}
            open={open}
          >
            <div className="reset">
              <form onSubmit={handleResetSubmit}>
                <div className="reset-form">
                  <h3>
                    After clicking the reset button, a newly generated password
                    will be sent to your email. Kindly ensure to check your spam
                    folder as well. Once you receive the password, you can use
                    it to log in here.
                  </h3>
                </div>
                <div className="reset-form">
                  <h3 htmlFor="studentName">User Email</h3>
                  <input
                    type="email"
                    id="userEmail"
                    className="input-field-reset"
                    placeholder="User Email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    // required
                  />
                </div>
                <div className="reset-form">
                  <button>
                    Reset Password <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </Drawer>
          <ConfigProvider>
            <div className="login-page">
              <div className="login-container">
                <div className="login-page-left">
                  <form onSubmit={handleSubmit}>
                    <div className="wrapper">
                      <div className="heading">
                        <div>
                          <h2>Login <span><p> Student </p></span></h2>
                          <p className="login-tag">Login to your account</p>
                        </div>
                        <div>
                          <img className="loginlogo" src={longlogo2} />
                        </div>
                      </div>

                      <div className="input-group">
                        <label htmlFor="studentName">User Email :</label>
                        <input
                          type="text"
                          id="username"
                          className="input-field"
                          placeholder="Username"
                          required
                          value={user_email}
                          onChange={(e) => setUserEmail(e.target.value)}
                          onMouseDown={(e) => setUserNameValidation(true)}
                        />
                      </div>
                      {user_email.length === 0 && userNameValidation ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: "-10px",
                            padding: "0px",
                          }}
                        >
                          User Name is Required{" "}
                        </p>
                      ) : (
                        ""
                      )}

                      <div className="input-group">
                        <label htmlFor="studentName">User Password :</label>
                        <input
                          type="password"
                          id="password"
                          className="input-field"
                          placeholder="Password"
                          required
                          value={user_password}
                          onChange={(e) => setPassword(e.target.value)}
                          onMouseDown={(e) => setPasswordValidation(true)}
                          maxLength={12}
                        />

                        {user_password.length === 0 && passwordValidation ? (
                          <p
                            style={{
                              color: "red",
                              padding: "0px",
                              marginTop: "-10px",
                            }}
                          >
                            Password is Required{" "}
                          </p>
                        ) : (
                          " "
                        )}
                      </div>

                      <div className="input-group row">
                        <div className="row">
                          <input type="checkbox" id="remember" hidden />
                          <label
                            for="remember"
                            className="custom-checkbox"
                          ></label>
                          <label className="custom-checkbox1" for="remember">
                            Remember me?
                          </label>
                        </div>

                        <div className="row">
                          <a
                            style={{ cursor: "pointer" }}
                            className="link-tag"
                            target="_blank"
                            onClick={showDrawer}
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>

                      <div className="input-group">
                        <button>
                          Login <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="wrapper-right">
                    <div>
                      <img className="long-logo" src={longlogo} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ConfigProvider>
        </>
      )}
    </>
  );
};

export default LoginPage;
