/*
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import logo from "../assets/logo.png";

const AppNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const pillStyle = {
    padding: "8px 16px",
    borderRadius: "50px",
    background: "linear-gradient(135deg,#24c6dc,#514a9d)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "0.8rem",
    textDecoration: "none",
    boxShadow: "0 8px 22px rgba(36,198,220,0.6)",
    transition: "all 0.3s ease",
  };

  const redPillStyle = {
    ...pillStyle,
    background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
    boxShadow: "0 8px 22px rgba(255,65,108,0.6)",
  };

  const hoverIn = (e) => (e.currentTarget.style.transform = "scale(1.08)");
  const hoverOut = (e) => (e.currentTarget.style.transform = "scale(1)");

  return (
    <Navbar expand="lg" sticky="top" style={{ background: "#000" }} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="MS Optical" height="45" />
          <span className="fw-bold text-white">MS OPTICAL</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          <Nav className="mx-auto gap-3">
            {["/", "/eyeglasses", "/sunglasses", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                style={pillStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </NavLink>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {isLoggedIn && (
              <Link
                to="/profile"
                className="btn btn-outline-light rounded-circle"
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonCircle size={22} />
              </Link>
            )}

            <Link
              to="/admin-login"
              style={pillStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Admin
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                style={redPillStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                style={pillStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                Login
              </Link>
            )}
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
*/


import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import logo from "../assets/logo.png";

const pillStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px", // slightly smaller for desktop
  borderRadius: "50px",
  background: "linear-gradient(135deg,#24c6dc,#514a9d)",
  color: "#fff",
  fontWeight: "700",
  fontSize: "0.75rem",
  textDecoration: "none",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 22px rgba(36,198,220,0.6)",
};

const hoverIn = (e) => (e.currentTarget.style.transform = "scale(1.08)");
const hoverOut = (e) => (e.currentTarget.style.transform = "scale(1)");

const AppNavbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const handleLinkClick = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "#000",
        minHeight: "56px", // reduced height for desktop
      }}
      expanded={expanded}
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
          style={{ minHeight: "40px" }}
        >
          <img src={logo} alt="MS Optical" height="38" />
          <div
            className="d-none d-md-block text-white"
            style={{ lineHeight: "1.1" }}
          >
            <div className="fw-bold fs-5">MS OPTICAL</div>
            <small className="text-info">EYE CARE STORE</small>
          </div>
        </Navbar.Brand>

        {/* TOGGLE */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="navbar-nav">
          {/* NAV LINKS */}
          <Nav className="mx-auto gap-2 d-flex flex-wrap justify-content-center text-center">
            {["/", "/eyeglasses", "/sunglasses", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                style={pillStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                onClick={handleLinkClick}
              >
                {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
              </NavLink>
            ))}
          </Nav>

          {/* RIGHT SIDE */}
          <div className="d-flex flex-column flex-lg-row align-items-center gap-2 mt-3 mt-lg-0">
            {isLoggedIn && (
              <Link
                to="/profile"
                style={{
                  ...pillStyle,
                  padding: "6px",
                  width: "36px",
                  height: "36px",
                  justifyContent: "center",
                }}
                title="My Profile"
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                onClick={handleLinkClick}
              >
                <PersonCircle size={18} />
              </Link>
            )}

            {/* ADMIN */}
            <Link
              to="/admin-login"
              style={pillStyle}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
              onClick={handleLinkClick}
            >
              Admin
            </Link>

            {/* LOGIN / LOGOUT */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setExpanded(false);
                }}
                style={{
                  ...pillStyle,
                  background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
                  boxShadow: "0 8px 22px rgba(255,75,43,0.6)",
                  border: "none",
                }}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                style={pillStyle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                onClick={handleLinkClick}
              >
                User Login
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
