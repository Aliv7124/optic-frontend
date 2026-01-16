/*
import React, { useState, useRef } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState({
    prescription: null,
    brokenFrame: null,
  });
  const [loading, setLoading] = useState(false);

  // ✅ Refs for file inputs
  const prescriptionRef = useRef(null);
  const brokenFrameRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({ ...files, [name]: selectedFiles[0] || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("message", form.message);

      if (files.prescription) fd.append("prescription", files.prescription);
      if (files.brokenFrame) fd.append("brokenFrame", files.brokenFrame);

      await API.post("/contact", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Message sent successfully!");
      setForm({ name: "", phone: "", message: "" });
      setFiles({ prescription: null, brokenFrame: null });

      // ✅ Clear file inputs using refs
      if (prescriptionRef.current) prescriptionRef.current.value = "";
      if (brokenFrameRef.current) brokenFrameRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-body">
      
      <section className="py-5 border-bottom">
        <div className="container py-5 text-center">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="text-secondary fs-5">
            We’re here to help you see better. Reach out anytime.
          </p>
        </div>
      </section>

      
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <h3 className="fw-bold mb-4">MS Optical Store</h3>
              <p>📍 New Barrackpore Bus Stand, Near Kadamtala Bazar, Kolkata</p>
              <p>📞 +91 8017306009</p>
              <p>💬 WhatsApp: +91 8017306009</p>
              <p>⏰ Mon – Sat: 9:30 AM – 12:20 PM and 4:30 PM – 9:20 PM</p>
            </div>

            <div className="col-lg-7">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Send us a message</h4>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        className="form-control"
                        rows="4"
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Upload Prescription (optional)</label>
                      <input
                        type="file"
                        name="prescription"
                        className="form-control"
                        onChange={handleFileChange}
                        ref={prescriptionRef} // ✅ ref added
                        accept="image/*,.pdf"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Upload Broken/Old Frame (optional)</label>
                      <input
                        type="file"
                        name="brokenFrame"
                        className="form-control"
                        onChange={handleFileChange}
                        ref={brokenFrameRef} // ✅ ref added
                        accept="image/*"
                      />
                    </div>

                    <button type="submit" className="btn btn-dark px-4" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
*/


import React, { useState, useRef } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [files, setFiles] = useState({ prescription: null, brokenFrame: null });
  const [loading, setLoading] = useState(false);

  const prescriptionRef = useRef(null);
  const brokenFrameRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles({ ...files, [name]: fileList[0] || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("message", form.message);
      if (files.prescription) fd.append("prescription", files.prescription);
      if (files.brokenFrame) fd.append("brokenFrame", files.brokenFrame);

      await API.post("/contact", fd);
      toast.success("Message sent successfully!");

      setForm({ name: "", phone: "", message: "" });
      setFiles({ prescription: null, brokenFrame: null });
      prescriptionRef.current.value = "";
      brokenFrameRef.current.value = "";
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="py-5 text-center"
        style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
      >
        <div className="container py-5">
          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: "3rem",
              background: "linear-gradient(90deg,#ff512f,#dd2476,#24c6dc,#514a9d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "300% 300%",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            Contact Us
          </h1>
          <div
            style={{
              background: "linear-gradient(135deg, #24c6dc, #514a9d)",
              padding: "1rem 1.5rem",
              borderRadius: "12px",
              display: "inline-block",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(36,198,220,0.4)",
            }}
          >
            <p className="fs-5 mb-0">
              We’re here to help you see better. Reach out anytime.
            </p>
          </div>
        </div>
      </section>

      {/* BODY SECTION */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #216777 60%, #00ff3c 100%)",
          padding: "4rem 1rem",
        }}
      >
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* STORE INFO */}
            <div className="col-lg-5 text-white">
              <div
                className="my-2"
                style={{
                  background: "linear-gradient(135deg, #9d267d, #c63f46)",
                  padding: "1rem 1.5rem",
                  borderRadius: "12px",
                  display: "inline-block",
                  color: "#fff",
                  textAlign: "center",
                  boxShadow: "0 8px 24px rgba(209, 83, 167, 0.4)",
                }}
              >
                <h3 className="fs-5 mb-0">MS OPTICAL STORE</h3>
              </div>
              <p className="fw-semibold">📍 New Barrackpore Bus Stand, Near Kadamtala Bazar, Kolkata</p>
              <p className="fw-semibold">📞 +91 8017306009</p>
              <p className="fw-semibold">💬 WhatsApp: +91 8017306009</p>
              <p className="fw-semibold">⏰ Mon – Sat: 9:30 AM – 12:20 PM & 4:30 PM – 9:20 PM</p>
            </div>

            {/* CONTACT FORM */}
            <div className="col-lg-7">
              <div
                className="p-4"
                style={{
                  borderRadius: "25px",
                  background: "linear-gradient(145deg, #ffffff, #f0f0f5)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(255,81,47,0.2)",
                  border: "1px solid rgba(221,36,118,0.2)",
                  transition: "all 0.3s ease",
                }}
              >
                <h4
                  className="fw-bold mb-4 text-center"
                  style={{
                    fontSize: "1.8rem",
                    background: "linear-gradient(90deg, #ff512f, #dd2476)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  }}
                >
                  Send us a message
                </h4>

                <form onSubmit={handleSubmit}>
                  {[{ label: "Your Name", name: "name", type: "text" }, { label: "Mobile Number", name: "phone", type: "tel" }].map((f) => (
                    <div className="mb-3" key={f.name}>
                      <label className="form-label fw-semibold">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        className="form-control"
                        value={form[f.name]}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: "12px",
                          border: "1px solid #ff512f",
                          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 10px rgba(221,36,118,0.6)")}
                        onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 2px 6px rgba(0,0,0,0.05)")}
                      />
                    </div>
                  ))}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #ff512f",
                        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 10px rgba(221,36,118,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 2px 6px rgba(0,0,0,0.05)")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Upload Prescription</label>
                    <input
                      type="file"
                      name="prescription"
                      className="form-control"
                      ref={prescriptionRef}
                      onChange={handleFileChange}
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #ff512f",
                        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Upload Old/Broken Frame</label>
                    <input
                      type="file"
                      name="brokenFrame"
                      className="form-control"
                      ref={brokenFrameRef}
                      onChange={handleFileChange}
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #ff512f",
                        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="fw-bold"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 22px",
                      borderRadius: "50px",
                      background: "linear-gradient(135deg,#ff512f,#dd2476)",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 12px 35px rgba(221,36,118,0.7)",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
};

export default Contact;
