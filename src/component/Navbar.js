import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active "
                aria-current="page"
                to="/"
                style={{
                  fontWeight: 500,
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="nav-link active "
                aria-current="page"
                to="/PDFmaker"
                style={{ fontWeight: 500 }}
              >
                Create PDF
              </Link>
            </li>
            <li>
              <Link
                className="nav-link active "
                aria-current="page"
                to="/about"
                style={{ fontWeight: 500 }}
              >
                About
              </Link>
            </li>
          </ul>

          <div
            className={`form-check form-switch text-${
              props.mode === "light" ? "dark" : "light"
            }`}
          >
            <input
              className="form-check-input "
              type="checkbox"
              onClick={props.toggleMode}
              role="switch"
              id="flexSwitchCheckChecked"
            />
            <label
              className="form-check-label "
              htmlFor="flexSwitchCheckChecked"
              style={{
                fontWeight: 500,
                color: props.mode === "dark" ? "white" : "#394867",
              }}
            >
              {props.mode === "light"
                ? "Enable dark mode"
                : "Enable light mode"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Proptypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

// Default proptypes

Navbar.defaultProps = {
  title: "title here",
  aboutText: "abouttext here",
};
