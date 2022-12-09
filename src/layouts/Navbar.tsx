import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  loggedIn: boolean;
  username: string;
  logout: () => void;
}

const Navbar: React.FC<IProps> = ({ loggedIn, username, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-3">
      <div className="container-fluid">
        <div className="navbar-brand" id="nav-title">
          Beelay
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {!loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          )}
          {loggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/profile" className="nav-link text-info">
                  {username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
