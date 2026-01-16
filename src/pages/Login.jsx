
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [tab, setTab] = useState("login");
  const [step, setStep] = useState(1);

  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        phone: loginPhone,
        password: loginPassword,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.role);
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/send-otp", { phone: signupPhone });
      if (res.data.success) {
        setOtp(res.data.otp);
        setStep(2);
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/verify-otp", {
        name: signupName,
        phone: signupPhone,
        password: signupPassword,
        otp,
      });

      if (res.data.success) {
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userRole", res.data.role);
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
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
        
        <h2
          className="text-center fw-bold mb-4"
          style={{
            fontSize: "2.4rem",
            background:
              "linear-gradient(270deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 6s ease infinite",
            textShadow: "0 0 10px rgba(255,81,47,0.7), 0 0 20px rgba(36,198,220,0.5)",
          }}
        >
          Welcome
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

          .tab-btn {
            flex: 1;
            padding: 10px 0;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .tab-btn.active {
            background: linear-gradient(135deg, #24c6dc, #514a9d);
            color: #fff;
            box-shadow: 0 6px 20px rgba(36,198,220,0.5);
          }

          .tab-btn.inactive {
            background: rgba(255,255,255,0.05);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.2);
          }
        `}</style>

        
        <div className="d-flex gap-2 mb-4">
          <button
            className={`tab-btn ${tab === "login" ? "active" : "inactive"}`}
            onClick={() => {
              setTab("login");
              setStep(1);
            }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${tab === "signup" ? "active" : "inactive"}`}
            onClick={() => {
              setTab("signup");
              setStep(1);
            }}
          >
            Signup
          </button>
        </div>

        
        {tab === "login" && (
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <input
              className="neon-input"
              placeholder="Phone"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              required
            />
            <input
              type="password"
              className="neon-input"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="gradient-btn">
              Login
            </button>
          </form>
        )}

      
        {tab === "signup" && step === 1 && (
          <form onSubmit={handleSendOtp} className="d-flex flex-column gap-3">
            <input
              className="neon-input"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
            <input
              className="neon-input"
              placeholder="Phone"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              required
            />
            <input
              type="password"
              className="neon-input"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <button type="submit" className="gradient-btn">
              Send OTP
            </button>
          </form>
        )}

        
        {tab === "signup" && step === 2 && (
          <form onSubmit={handleVerifyOtp} className="d-flex flex-column gap-3">
            <input
              className="neon-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="gradient-btn">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
