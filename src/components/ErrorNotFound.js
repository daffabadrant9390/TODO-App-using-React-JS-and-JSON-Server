import "../App.css";
import { Link } from "react-router-dom";

const ErrorNotFound = () => {
  return (
    <div className="error-404-container">
      <img src="./images/404-error.png" alt="404-error-logo" />
      <h2>Sorry, The page you are looking for is not exist!</h2>
      <Link to={"/"} className="btn btn-medium btn-primary">
        Home Page
      </Link>
    </div>
  );
};

export default ErrorNotFound;
