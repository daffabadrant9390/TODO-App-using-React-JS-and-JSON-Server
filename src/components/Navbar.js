import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav>
      <div className="nav-container">
        <div className="brand-logo">
          <img
            src="./images/success.png"
            className="img-logo"
            alt="rocket todos app"
          />
        </div>

        <div onClick={() => setOpenMenu(!openMenu)}>
          <img
            src="./images/menu.png"
            className="burger-menu"
            alt="burget-menu"
          />
        </div>

        <ul className="nav-list">
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
      </div>

      {openMenu && (
        <div className={openMenu ? "open-menu fade-down" : "open-menu fade-up"}>
          <Link to="/" className={location.pathname == "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            to="/add"
            className={location.pathname == "/add" ? "active" : ""}
          >
            Add Activity
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
