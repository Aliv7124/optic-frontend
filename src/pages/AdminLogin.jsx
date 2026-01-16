/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", { email, password });

      // Check role from backend response
      if (res.data.data.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      // Store admin token
      localStorage.setItem("admintoken", res.data.token);

      // Store admin info
      localStorage.setItem("admin", JSON.stringify(res.data.data));

      // Store role separately
      localStorage.setItem("role", res.data.data.role);
       localStorage.setItem("isAdminAuthenticated", "true");
      // Navigate to admin dashboard
      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-4 mx-auto">
        <h3 className="fw-bold mb-4">Admin Login</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-dark w-100 rounded-0 fw-bold">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
*/


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", { email, password });

      if (res.data.data.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      localStorage.setItem("admintoken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.data));
      localStorage.setItem("role", res.data.data.role);
      localStorage.setItem("isAdminAuthenticated", "true");

      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a0f2e, #3a1c71, #0f2027)",
      }}
    >
      <div
        className="shadow-xl p-5 rounded-4"
        style={{
          width: "100%",
          maxWidth: 450,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 8px 24px rgba(255,81,47,0.2), 0 16px 60px rgba(36,198,220,0.2)",
        }}
      >
        {/* Gradient Neon Heading */}
        <h2
          className="text-center fw-bold mb-4"
          style={{
            fontSize: "2.4rem",
            background: "linear-gradient(270deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 6s ease infinite",
            textShadow:
              "0 0 10px rgba(255,81,47,0.7), 0 0 20px rgba(36,198,220,0.5)",
          }}
        >
          Admin Login
        </h2>

        <style>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .neon-input {
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.05);
            padding: 10px 14px;
            color: #fff;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 6px rgba(0,0,0,0.3);
          }

          .neon-input:focus {
            outline: none;
            border-color: #ff512f;
            box-shadow: 0 0 12px rgba(255,81,47,0.7), 0 0 24px rgba(36,198,220,0.5);
            background: rgba(255,255,255,0.1);
          }

          .gradient-btn {
            border-radius: 50px;
            font-weight: 700;
            padding: 10px 18px;
            border: none;
            cursor: pointer;
            color: #fff;
            background: linear-gradient(135deg, #ff512f, #dd2476);
            box-shadow: 0 8px 20px rgba(221,36,118,0.6), 0 4px 10px rgba(36,198,220,0.4);
            transition: all 0.3s ease;
          }

          .gradient-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 30px rgba(221,36,118,0.8), 0 6px 12px rgba(36,198,220,0.6);
          }
        `}</style>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            className="neon-input"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="neon-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="gradient-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

