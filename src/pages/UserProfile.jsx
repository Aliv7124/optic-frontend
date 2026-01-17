/*
import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import { Table, Button, Spinner } from "react-bootstrap";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.data.user);
      setOrders(res.data.data.orders);
    } catch (err) {
      console.error("Profile load error:", err);
      alert("Failed to load profile. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(270deg, #0f0c29, #302b63, #24243e, #1a1a2e)",
        backgroundSize: "800% 800%",
        animation: "premiumBg 20s ease infinite",
        padding: "2.5rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <h2
          className="mb-5 text-center fw-bold"
          style={{
            fontSize: "2.6rem",
            background: "linear-gradient(90deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientMove 5s ease infinite",
            textShadow: "0 4px 18px rgba(0,0,0,0.85)",
            cursor: "default",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          My Profile & Orders
        </h2>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes premiumBg {
            0% { background-position:0% 50%; }
            50% { background-position:100% 50%; }
            100% { background-position:0% 50%; }
          }
          .premium-table thead th {
            background: linear-gradient(135deg, #ff512f, #dd2476, #24c6dc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.95rem;
          }
          .premium-table tbody tr:nth-child(even) {
            background: rgba(255,255,255,0.08);
          }
          .premium-table tbody tr:nth-child(odd) {
            background: rgba(255,255,255,0.02);
          }
        `}</style>

          {loading ? (
          <div
            style={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" variant="light" />
          </div>
        ) : profile ? (
          <>
           
            <div
              style={{
                marginBottom: "2rem",
                padding: "2rem",
                borderRadius: "25px",
                background: "linear-gradient(145deg, #ff512f, #24c6dc, #dd2476)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                color: "#fff",
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  background: "linear-gradient(90deg, #24c6dc, #ff512f, #dd2476)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 12px rgba(0,0,0,0.6)",
                  transition: "all 0.3s ease",
                }}
              >
              Name:{profile.name}
              </h3>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  color:" #FFD700",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  marginBottom: 0,
                }}
              >
                Phone: {profile.phone || "-"}
              </p>
            </div>

           
            <h3
              className="mb-3 fw-bold"
              style={{
                fontSize: "2rem",
                background: "linear-gradient(90deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 12px rgba(0,0,0,0.6)",
              }}
            >
              My Orders
            </h3>

            {orders.length === 0 ? (
              <p className="text-white fw-bold">You have not placed any orders yet.</p>
            ) : (
              <Table
                striped
                bordered
                responsive
                className="premium-table"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(49, 148, 80, 0.97)",
                }}
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Lens Type</th>
                    <th>Prescription</th>
                    <th>Payment Status</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td style={{ fontWeight: 600, color: "#090909" }}>{o.product?.name || "N/A"}</td>
                      <td>
                        {o.product?.image ? (
                          <img
                            src={`http://localhost:5001${o.product.image}`}
                            alt={o.product.name}
                            width="50"
                            style={{ cursor: "pointer", borderRadius: "8px" }}
                            onClick={() => {
                              setModalImage(`http://localhost:5001${o.product.image}`);
                              setShowImageModal(true);
                            }}
                          />
                        ) : "N/A"}
                      </td>
                      <td style={{ color: "#181818" }}>₹{o.totalPrice || 0}</td>
                      <td style={{ color: "#141413" }}>{o.lensType || "N/A"}</td>
                      <td>
                        {o.prescription ? (
                          <Button
                            size="sm"
                            style={{
                              borderRadius: "50px",
                              background: "linear-gradient(135deg, #ff512f, #dd2476)",
                              border: "none",
                              color: "#0f0f0f",
                            }}
                            onClick={async () => {
                              try {
                                const path = o.prescription.startsWith("/")
                                  ? `http://localhost:5001${o.prescription}`
                                  : `http://localhost:5001/${o.prescription}`;
                                const res = await fetch(path);
                                if (!res.ok) throw new Error("File not found");
                                const blob = await res.blob();
                                const link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = o.prescription.split("/").pop();
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              } catch {
                                alert("Failed to download prescription");
                              }
                            }}
                          >
                            Download
                          </Button>
                        ) : "-"}
                      </td>
                      <td style={{ color: "#100f0f" }}>{o.paymentStatus || "Pending"}</td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color:
                            o.status === "Accepted"
                              ? "green"
                              : o.status === "Rejected"
                              ? "red"
                              : "orange",
                        }}
                      >
                        {o.status || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        ) : (
          <p className="text-white">Error loading profile.</p>
        )}

       
        {showImageModal && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowImageModal(false)}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <img src={modalImage} alt="product" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
*/




import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import { Table, Button, Spinner } from "react-bootstrap";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.data.user);
      setOrders(res.data.data.orders);
    } catch (err) {
      alert("Failed to load profile. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(270deg, #0f0c29, #302b63, #24243e, #1a1a2e)",
        backgroundSize: "800% 800%",
        animation: "premiumBg 20s ease infinite",
        padding: "2.5rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <h2
          className="mb-5 text-center fw-bold"
          style={{
            fontSize: "2.6rem",
            background:
              "linear-gradient(90deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientMove 5s ease infinite",
            textShadow: "0 4px 18px rgba(0,0,0,0.85)",
          }}
        >
          My Profile & Orders
        </h2>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes premiumBg {
            0% { background-position:0% 50%; }
            50% { background-position:100% 50%; }
            100% { background-position:0% 50%; }
          }
          .premium-table thead th {
            background: linear-gradient(135deg, #ff512f, #dd2476, #24c6dc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 0.9rem;
          }
        `}</style>

        {loading ? (
          <div
            style={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" variant="light" />
          </div>
        ) : profile ? (
          <>
            {/* PROFILE */}
             <div
              style={{
                marginBottom: "2rem",
                padding: "2rem",
                borderRadius: "25px",
                border: "3px solid transparent",
                background:
                  "linear-gradient(#111,#111) padding-box, linear-gradient(270deg,#ff512f,#dd2476,#24c6dc,#514a9d) border-box",
                backgroundSize: "400% 400%",
                animation: "borderFlow 6s ease infinite",
                color: "#fff",
                boxShadow: "0 12px 30px rgba(0,0,0,.6)",
              }}
            >
              <h3
                style={{
                  background:
                    "linear-gradient(90deg,#24c6dc,#ff512f,#dd2476)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                Name: {profile.name}
              </h3>
              <p style={{ color: "#FFD700", fontWeight: 600 }}>
                Phone: {profile.phone || "-"}
              </p>
            </div>

            <h3
              className="mb-3 fw-bold"
              style={{
                fontSize: "2rem",
                background:
                  "linear-gradient(90deg, #ff512f, #dd2476, #24c6dc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Orders
            </h3>

            {/* MOBILE SWIPE HINT */}
            <p className="text-center text-light d-md-none mb-2">
              ⬅️ Swipe to view more ➡️
            </p>

            {/* TABLE SCROLLER */}
            <div
              style={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "20px",
              }}
            >
              <Table
                bordered
                className="premium-table"
                style={{
                  minWidth: "900px",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Lens</th>
                    <th>Prescription</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td className="fw-bold">{o.product?.name || "N/A"}</td>
                      <td>
                        {o.product?.image ? (
                          <img
                            src={`http://localhost:5001${o.product.image}`}
                            width="50"
                            style={{
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setModalImage(
                                `http://localhost:5001${o.product.image}`
                              );
                              setShowImageModal(true);
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>₹{o.totalPrice || 0}</td>
                      <td>{o.lensType || "-"}</td>
                      <td>{o.prescription ? "Available" : "-"}</td>
                      <td>{o.paymentStatus || "Pending"}</td>
                      <td
                        style={{
                          fontWeight: "bold",
                          color:
                            o.status === "Accepted"
                              ? "green"
                              : o.status === "Rejected"
                              ? "red"
                              : "orange",
                        }}
                      >
                        {o.status || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <p className="text-white">Error loading profile.</p>
        )}

        {/* IMAGE MODAL */}
        {showImageModal && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowImageModal(false)}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <img src={modalImage} alt="product" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;














