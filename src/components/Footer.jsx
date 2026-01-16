/*
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Award, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.147537805927!2d88.4677143!3d22.685551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f4292ca0181%3A0x5080b0e03a0c8905!2sM.S.OPTICAL%20%26%20COMMUNICATION!5e0!3m2!1sen!2sin!4v1767763487236!5m2!1sen!2sin";
  const googleMapsExternalLink = "https://maps.app.goo.gl/3Kuk4MTCnxSykfUw7";

  return (
    <footer className="bg-body border-top py-2 mt-auto">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">

          
          <div className="d-flex flex-column align-items-start">
            <div className="d-flex align-items-center mb-2">
              <img
                src={logo}
                alt="MS Optical Logo"
                width="36"
                height="36"
                className="rounded-circle me-2 border bg-white shadow-sm"
              />
              <span className="fw-bold small text-body">MS OPTICAL</span>
            </div>
            <div className="small text-secondary mb-1">Expert eye care & eyewear solutions</div>
            <div className="d-inline-flex align-items-center bg-dark text-white px-2 py-1 rounded-1 small fw-bold">
              <Award size={14} className="me-1 text-warning" /> 40+ YEARS
            </div>
          </div>

          
          <div className="d-flex flex-column small">
            <span className="fw-bold mb-1 text-body">Explore</span>
            <Link to="/" className="text-secondary text-decoration-none mb-1">Home</Link>
            <Link to="/eyeglasses" className="text-secondary text-decoration-none mb-1">Eyeglasses</Link>
            <Link to="/sunglasses" className="text-secondary text-decoration-none mb-1">Sunglasses</Link>
            <Link to="/admin-login" className="text-secondary text-decoration-none">Admin</Link>
          </div>

          
          <div className="d-flex flex-column small">
            <span className="fw-bold mb-1 text-body">Contact</span>
            <div className="d-flex align-items-center mb-1 gap-1 text-secondary">
              <MapPin size={16} /> New Barrackpore Bus Stand,Near Kadamtala Bazar
            </div>
            <div className="d-flex align-items-center mb-1 gap-1 text-secondary">
              <Phone size={16} /> <a href="tel:+918017306009" className="text-body text-decoration-none">+91 8017306009</a>
            </div>
            <div className="d-flex align-items-start mb-1 gap-1 text-secondary">
              <Clock size={16} /> 09:30 AM - 12:20 PM | 04:30 PM - 09:20 PM
            </div>
            <a
              href={googleMapsExternalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark rounded-0 mt-1 px-2 fw-bold d-inline-flex align-items-center gap-1"
            >
              Directions <ArrowUpRight size={12} />
            </a>
          </div>

        </div>

        <hr className="my-2 opacity-25" />

        <div className="text-center small text-muted">
          © {new Date().getFullYear()} MS Optical Store. Developed for Dilip Roy.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
*/


import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Award, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const googleMapsExternalLink = "https://maps.app.goo.gl/3Kuk4MTCnxSykfUw7";

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a1a40 60%, #0f9bff 100%)",
        color: "#fff",
        padding: "2.5rem 1rem 1.5rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between gap-4">

          {/* Logo & About */}
          <div style={{ maxWidth: "260px" }}>
            <div className="d-flex align-items-center mb-2">
              <img
                src={logo}
                alt="MS Optical"
                width="42"
                height="42"
                className="rounded-circle me-2"
                style={{
                  background: "#fff",
                  padding: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
              />
              <span
                style={{
                  fontWeight: "800",
                  fontSize: "1.2rem",
                  background:
                    "linear-gradient(90deg,#ff512f,#dd2476,#24c6dc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "300% 300%",
                  animation: "gradientMove 5s ease infinite",
                }}
              >
                MS OPTICAL
              </span>
            </div>

            <p style={{ color: "#e0e0e0", fontSize: "0.9rem" }}>
              Expert eye care & premium eyewear solutions.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 10px",
                background:
                  "linear-gradient(135deg,#ff512f,#dd2476)",
                borderRadius: "6px",
                fontWeight: "700",
                fontSize: "0.75rem",
                boxShadow: "0 6px 16px rgba(221,36,118,0.6)",
              }}
            >
              <Award size={14} /> 40+ YEARS
            </div>
          </div>

          {/* Explore */}
          <div>
            <h6 className="fw-bold mb-2">Explore</h6>
            {[
              { name: "Home", path: "/" },
              { name: "Eyeglasses", path: "/eyeglasses" },
              { name: "Sunglasses", path: "/sunglasses" },
              { name: "Admin", path: "/admin-login" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  display: "block",
                  color: "#dcdcdc",
                  textDecoration: "none",
                  marginBottom: "6px",
                  transition: "color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#24c6dc";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#dcdcdc";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div style={{ maxWidth: "320px" }}>
            <h6 className="fw-bold mb-2">Contact</h6>

            <p className="small text-light mb-1">
              <MapPin size={14} className="me-1" />
              New Barrackpore Bus Stand, Near Kadamtala Bazar
            </p>

            <p className="small mb-1">
              <Phone size={14} className="me-1" />
              <a
                href="tel:+918017306009"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                +91 8017306009
              </a>
            </p>

            <p className="small text-light">
              <Clock size={14} className="me-1" />
              09:30–12:20 | 04:30–09:20
            </p>

            <a
              href={googleMapsExternalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "8px",
                padding: "8px 14px",
                borderRadius: "50px",
                background:
                  "linear-gradient(135deg,#24c6dc,#514a9d)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "0.8rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 22px rgba(36,198,220,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Directions <ArrowUpRight size={12} />
            </a>
          </div>

        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "1.5rem 0" }} />

        <p className="text-center small text-light mb-0">
          © {new Date().getFullYear()} MS Optical Store · Developed for Dilip Roy
        </p>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
