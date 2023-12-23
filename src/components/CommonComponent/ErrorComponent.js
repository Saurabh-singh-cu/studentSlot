import { useRouteError } from "react-router";
import { useNavigate } from "react-router";

const ErrorComponent = () => {
    
  const navigate = useNavigate();

  const error = useRouteError();

  const navigatetohome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="error-boundary">
        <div className="error-box">
          <h3>{error.data}</h3>
          <p>
            {" "}
            Status Message: <span className="e404">{error.statusText}</span>
          </p>
          <p>
            {" "}
            Status Code: <span className="e404">{error.status}</span>
          </p>
          <button className="go-back" onClick={navigatetohome}>Back</button>
          <hr className="line-hori" />
        </div>
      </div>
    </>
  );
};

export default ErrorComponent;
