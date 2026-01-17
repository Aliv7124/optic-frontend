/*
import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

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
      <Container style={{ maxWidth: "1200px" }}>
        <h3
          className="mb-5 text-center fw-bold main-heading"
          style={{
            position: "relative",
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
          Our Products
          <span className="line-left" />
          <span className="line-right" />
        </h3>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes doorLeftLoop {
            0% { left: 0; opacity: 1; }
            45% { left: -55%; opacity: 0; }
            55% { left: -55%; opacity: 0; }
            100% { left: 0; opacity: 1; }
          }
          @keyframes doorRightLoop {
            0% { right: 0; opacity: 1; }
            45% { right: -55%; opacity: 0; }
            55% { right: -55%; opacity: 0; }
            100% { right: 0; opacity: 1; }
          }
          @keyframes premiumBg {
            0% { background-position:0% 50%; }
            50% { background-position:100% 50%; }
            100% { background-position:0% 50%; }
          }

          .line-left,
          .line-right {
            position: absolute;
            top: 50%;
            height: 3px;
            transform: translateY(-50%);
          }

          .line-left {
            left: 0;
            width: calc(50% - 130px);
            background: linear-gradient(90deg, #ff512f, #dd2476);
            animation: doorLeftLoop 3s ease-in-out infinite;
          }

          .line-right {
            right: 0;
            width: calc(50% - 130px);
            background: linear-gradient(90deg, #dd2476, #24c6dc);
            animation: doorRightLoop 3s ease-in-out infinite;
          }

          @media (max-width: 768px) {
            .main-heading {
              font-size: 1.9rem !important;
              margin-bottom: 2.5rem !important;
            }
            .line-left,
            .line-right {
              width: 20%;
            }
          }

          @media (max-width: 576px) {
            .main-heading {
              font-size: 1.6rem !important;
            }
          }
        `}</style>

        {loading ? (
          <div className="text-center text-white fw-bold fs-5">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-white fw-bold fs-5">
            No products found.
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map((p) => (
              <Col key={p._id}>
                <Card
                  className="h-100 shadow-lg"
                  style={{
                    cursor: "pointer",
                    borderRadius: "20px",
                    border: "3px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(135deg, #ff512f, #dd2476, #24c6dc)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                  }}
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  {p.image && (
                    <Card.Img
                      src={`http://localhost:5001${p.image}`}
                      alt={p.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold text-dark fs-6">
                      {p.name}
                    </Card.Title>
                    <Card.Text className="fw-semibold text-secondary mb-3">
                      ₹{p.price}
                    </Card.Text>
                    <Button
                      className="mt-auto fw-bold"
                      style={{
                        borderRadius: "50px",
                        background:
                          "linear-gradient(135deg, #ff512f, #dd2476)",
                        border: "none",
                      }}
                    >
                      Buy Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
*/



import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(270deg, #0f0c29, #302b63, #24243e, #1a1a2e)",
        backgroundSize: "800% 800%",
        animation: "premiumBg 20s ease infinite",
        padding: "1.5rem 0.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container style={{ maxWidth: "1200px" }}>
        {/* Heading */}
        <h3
          className="mb-4 text-center fw-bold main-heading"
          style={{
            position: "relative",
            fontSize: "2rem",
            background:
              "linear-gradient(90deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientMove 5s ease infinite",
          }}
        >
          Our Products
          <span className="line-left" />
          <span className="line-right" />
        </h3>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes doorLeftLoop {
            0% { left: 0; opacity: 1; }
            45% { left: -55%; opacity: 0; }
            55% { left: -55%; opacity: 0; }
            100% { left: 0; opacity: 1; }
          }

          @keyframes doorRightLoop {
            0% { right: 0; opacity: 1; }
            45% { right: -55%; opacity: 0; }
            55% { right: -55%; opacity: 0; }
            100% { right: 0; opacity: 1; }
          }

          @keyframes premiumBg {
            0% { background-position:0% 50%; }
            50% { background-position:100% 50%; }
            100% { background-position:0% 50%; }
          }

          .line-left,
          .line-right {
            position: absolute;
            top: 50%;
            height: 3px;
            width: 35%;
            transform: translateY(-50%);
          }

          .line-left {
            left: 0;
            background: linear-gradient(90deg, #ff512f, #dd2476);
            animation: doorLeftLoop 3s ease-in-out infinite;
          }

          .line-right {
            right: 0;
            background: linear-gradient(90deg, #dd2476, #24c6dc);
            animation: doorRightLoop 3s ease-in-out infinite;
          }

          @media (max-width: 576px) {
            .main-heading {
              font-size: 1.6rem;
            }
            .line-left,
            .line-right {
              width: 22%;
            }
          }
        `}</style>

        {loading ? (
          <div className="text-center text-white fw-bold">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-white fw-bold">
            No products found.
          </div>
        ) : (
          <Row xs={2} sm={3} md={3} lg={4} className="g-3">
            {products.map((p) => (
              <Col key={p._id}>
                <Card
                  className="shadow"
                  style={{
                    cursor: "pointer",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  {p.image && (
                    <div
                      style={{
                        height: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f8f8f8",
                      }}
                    >
                      <img
                        src={`http://localhost:5001${p.image}`}
                        alt={p.name}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

                  <Card.Body style={{ padding: "10px" }}>
                    <Card.Title
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: "4px",
                      }}
                    >
                      {p.name}
                    </Card.Title>

                    <Card.Text
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        color: "#666",
                        marginBottom: "6px",
                      }}
                    >
                      ₹{p.price}
                    </Card.Text>

                    <Button
                      className="w-100"
                      style={{
                        fontSize: "0.8rem",
                        padding: "6px",
                        borderRadius: "20px",
                        background:
                          "linear-gradient(135deg, #ff512f, #dd2476)",
                        border: "none",
                      }}
                    >
                      Buy
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
