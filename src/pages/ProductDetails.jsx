/*
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { Button, Modal, Form } from "react-bootstrap";
import FaceTryOn from "../components/FaceTryOn";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [lensType, setLensType] = useState("");
  const [prescription, setPrescription] = useState(null);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const [showTryOn, setShowTryOn] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { redirectTo: `/checkout/${id}` } });
      return;
    }
    navigate(`/checkout/${id}`, { state: { lensType, prescription } });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImage;
    link.download = product.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      });
    }
  };

  if (loading || !product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem" }}>
        {loading ? "Loading..." : "Product not found"}
      </div>
    );
  }

  const frameUrl = `http://localhost:5001${product.image}`;


  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", padding: "3rem 1rem" }}>
      <div style={{ maxWidth: "800px", width: "100%", padding: "2.5rem", borderRadius: "20px", background: "rgba(0,0,0,0.75)", color: "#fff" }}>

        <h2 className="text-center mb-4">{product.name}</h2>

        <div
          style={{ cursor: "pointer", marginBottom: "1.5rem" }}
          onClick={() => {
            setCurrentImage(frameUrl);
            setImageModalOpen(true);
          }}
        >
          <img src={frameUrl} alt={product.name} className="img-fluid rounded" />
        </div>

        <p className="text-center fs-5">₹{product.price}</p>

        <Form.Group className="mb-3">
          <Form.Label>Lens Type</Form.Label>
          <Form.Select value={lensType} onChange={(e) => setLensType(e.target.value)}>
            <option value="">No Lens</option>
            <option value="Bluecut">Bluecut</option>
            <option value="Bifocal">Bifocal</option>
            <option value="Progressive">Progressive</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Upload Prescription</Form.Label>
          <Form.Control type="file" accept=".pdf,.jpg,.png" onChange={(e) => setPrescription(e.target.files[0])} />
        </Form.Group>

        <div className="d-flex gap-2 justify-content-center mb-3">
          <Button variant="dark" onClick={() => setShowTryOn(true)}>
            Try On
          </Button>

          <Button variant="warning" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>

       
        <Modal show={imageModalOpen} onHide={() => setImageModalOpen(false)} centered size="lg">
          <Modal.Body className="text-center">
            <img src={currentImage} alt="Product" className="img-fluid rounded mb-3" />
            <div className="d-flex justify-content-center gap-3">
              <Button onClick={handleDownload}>Download</Button>
              <Button onClick={handleShare}>Share</Button>
            </div>
          </Modal.Body>
        </Modal>

        
        <Modal
          show={showTryOn}
          onHide={() => setShowTryOn(false)}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Virtual Try-On</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <FaceTryOn frameUrl={frameUrl} />
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
};

export default ProductDetails;
*/


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { Button, Modal, Form } from "react-bootstrap";
import FaceTryOn from "../components/FaceTryOn";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [lensType, setLensType] = useState("");
  const [prescription, setPrescription] = useState(null);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const [showTryOn, setShowTryOn] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { redirectTo: `/checkout/${id}` } });
      return;
    }
    navigate(`/checkout/${id}`, { state: { lensType, prescription } });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImage;
    link.download = product.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      });
    }
  };

  if (loading || !product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "#fff",
          background: "linear-gradient(270deg, #0f0c29, #302b63, #24243e, #1a1a2e)",
          backgroundSize: "800% 800%",
          animation: "bgAnim 20s ease infinite",
        }}
      >
        {loading ? "Loading..." : "Product not found"}
        <style>{`
          @keyframes bgAnim {
            0% {background-position:0% 50%;}
            50% {background-position:100% 50%;}
            100% {background-position:0% 50%;}
          }
        `}</style>
      </div>
    );
  }

  const frameUrl = `https://optic-backend.onrender.com${product.image}`;


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "3rem 1rem",
        background: "linear-gradient(270deg, #0f0c29, #302b63, #24243e, #1a1a2e)",
        backgroundSize: "800% 800%",
        animation: "bgAnim 20s ease infinite",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "2.5rem",
          borderRadius: "25px",
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Product Name */}
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            fontSize: "2.5rem",
            background: "linear-gradient(90deg, #ff512f, #dd2476, #24c6dc, #514a9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientMove 5s ease infinite",
            textShadow: "0 4px 18px rgba(0,0,0,0.8)",
            cursor: "default",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {product.name}
        </h2>

        {/* Product Image */}
        <div
          style={{
            cursor: "pointer",
            marginBottom: "1.5rem",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            transition: "transform 0.3s ease",
          }}
          onClick={() => {
            setCurrentImage(frameUrl);
            setImageModalOpen(true);
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src={frameUrl} alt={product.name} className="img-fluid rounded" />
        </div>

        {/* Price */}
        <p
          className="text-center fs-4 fw-bold"
          style={{
            background: "linear-gradient(90deg, #ff512f, #dd2476)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 3px 10px rgba(0,0,0,0.6)",
          }}
        >
          ₹{product.price}
        </p>

        {/* Lens Type */}
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "600", color: "#FFD700" }}>Lens Type</Form.Label>
          <Form.Select
            value={lensType}
            onChange={(e) => setLensType(e.target.value)}
            style={{ borderRadius: "12px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid #FFD700" }}
          >
            <option value="">No Lens</option>
            <option value="Bluecut">Bluecut</option>
            <option value="Bifocal">Bifocal</option>
            <option value="Progressive">Progressive</option>
          </Form.Select>
        </Form.Group>

        {/* Prescription Upload */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: "600", color: "#FFD700" }}>Upload Prescription</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setPrescription(e.target.files[0])}
            style={{ borderRadius: "12px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid #FFD700" }}
          />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex gap-2 justify-content-center mb-3">
          <Button
            style={{
              background: "linear-gradient(135deg, #ff512f, #dd2476)",
              border: "none",
              borderRadius: "50px",
              fontWeight: "600",
              padding: "0.6rem 1.8rem",
              boxShadow: "0 4px 20px rgba(221,36,118,0.6)",
            }}
            onClick={() => setShowTryOn(true)}
          >
            Try On
          </Button>
          <Button
            style={{
              background: "linear-gradient(135deg, #24c6dc, #514a9d)",
              border: "none",
              borderRadius: "50px",
              fontWeight: "600",
              padding: "0.6rem 1.8rem",
              boxShadow: "0 4px 20px rgba(36,198,220,0.6)",
            }}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>

        {/* Image Modal */}
        <Modal show={imageModalOpen} onHide={() => setImageModalOpen(false)} centered size="lg">
          <Modal.Body className="text-center" style={{ background: "rgba(0,0,0,0.9)", borderRadius: "20px" }}>
            <img src={currentImage} alt="Product" className="img-fluid rounded mb-3" style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.6)" }} />
            <div className="d-flex justify-content-center gap-3">
              <Button
                style={{ background: "linear-gradient(135deg, #ff512f, #dd2476)", border: "none", borderRadius: "50px", fontWeight: "600", padding: "0.5rem 1.5rem" }}
                onClick={handleDownload}
              >
                Download
              </Button>
              <Button
                style={{ background: "linear-gradient(135deg, #24c6dc, #514a9d)", border: "none", borderRadius: "50px", fontWeight: "600", padding: "0.5rem 1.5rem" }}
                onClick={handleShare}
              >
                Share
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Virtual Try-On Modal */}
        <Modal show={showTryOn} onHide={() => setShowTryOn(false)} centered size="lg" backdrop="static">
          <Modal.Header closeButton style={{ background: "linear-gradient(135deg, #ff512f, #dd2476)" }}>
            <Modal.Title className="fw-bold text-white">Virtual Try-On</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center" style={{ background: "rgba(0,0,0,0.85)" }}>
            <FaceTryOn frameUrl={frameUrl} />
          </Modal.Body>
        </Modal>

      

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes bgAnim {
            0% {background-position:0% 50%;}
            50% {background-position:100% 50%;}
            100% {background-position:0% 50%;}
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProductDetails;
