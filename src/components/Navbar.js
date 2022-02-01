import "../App.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location);

  return (
    <nav>
      <div className="brand-logo">
        <h1>TODO App</h1>
      </div>
      <ul>
        <li>
          <Link to="/" className={location.pathname == "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={location.pathname == "/add" ? "active" : ""}
          >
            Add Activity
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
