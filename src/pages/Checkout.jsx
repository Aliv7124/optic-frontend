/*
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/api";

const stripePromise = loadStripe(
  "pk_test_51SnxUrH9MvXtyWo2TwoGEqxHHXTNvGIbrmEyU5ueugVFu5p16Jwdci7pNOdTVKlZtTCnmZQDoalCA5bCKXkLXtxu00ftsmtN8G"
);

const CheckoutForm = ({ clientSecret, product, lensType, prescription }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        setPaid(true);
        setMessage("Payment successful!");

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("product", product._id);
        formData.append("totalPrice", product.price);
        formData.append("paymentMethod", "Online");
        formData.append("stripePaymentId", result.paymentIntent.id);

        if (lensType) formData.append("lensType", lensType);
        if (prescription) formData.append("prescription", prescription);

        await axios.post("http://localhost:5001/api/orders/checkout", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (err) {
      setMessage("Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      {!paid && <PaymentElement />}
      {paid && (
        <div
          style={{
            padding: "1rem",
            background: "linear-gradient(90deg, #6a11cb, #2575fc, #ff7e5f)",
            color: "white",
            borderRadius: "12px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 0 15px rgba(255,255,255,0.5)",
          }}
        >
          Order placed successfully
        </div>
      )}
      <button
        type="submit"
        disabled={loading || paid}
        style={{
          background: "linear-gradient(135deg, #6a11cb, #ff416c)",
          color: "white",
          border: "none",
          padding: "0.8rem",
          borderRadius: "50px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(255,65,108,0.5)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,65,108,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(255,65,108,0.5)";
        }}
      >
        {loading ? "Processing..." : paid ? "Paid" : "Pay Now"}
      </button>
      {message && (
        <p
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "500",
            textShadow: "0 0 5px rgba(0,0,0,0.4)",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();

  const { lensType = "", prescription = null } = location.state || {};

  const [product, setProduct] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data.data);

        const paymentRes = await axios.post("http://localhost:5001/api/payment/create-payment-intent", {
          amount: res.data.data.price * 100,
        });
        setClientSecret(paymentRes.data.clientSecret);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #6a11cb 60%, #ff416c 100%)",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );

  if (!product)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #6a11cb 60%, #ff416c 100%)",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        Product not found
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "3rem 1rem",
        background: "linear-gradient(135deg, #6a11cb 60%, #ff416c 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2.5rem",
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
<h3
  style={{
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    background: "linear-gradient(135deg, #f7971e, #ffd200, #ff4e50, #1e3c72)", // vibrant contrasting colors
    backgroundSize: "400% 400%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "default",
    textShadow: "2px 2px 10px rgba(0,0,0,0.7)", // ensures visibility
    animation: "colorShift 6s ease infinite",
    transition: "transform 0.3s ease, text-shadow 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.textShadow = "4px 4px 15px rgba(0,0,0,0.9)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.textShadow = "2px 2px 10px rgba(0,0,0,0.7)";
  }}
>
  Checkout
</h3>

<style>{`
  @keyframes colorShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}</style>






        <p style={{ fontWeight: "500" }}>
          <strong>Product:</strong> {product.name}
        </p>
        <p style={{ fontWeight: "500" }}>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p style={{ fontWeight: "500" }}>
          <strong>Lens Type:</strong> {lensType || "None"}
        </p>
        <p style={{ fontWeight: "500" }}>
          <strong>Prescription:</strong> {prescription ? "Uploaded" : "Not uploaded"}
        </p>

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              product={product}
              lensType={lensType}
              prescription={prescription}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
*/

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/api";

const stripePromise = loadStripe(
  "pk_test_51SnxUrH9MvXtyWo2TwoGEqxHHXTNvGIbrmEyU5ueugVFu5p16Jwdci7pNOdTVKlZtTCnmZQDoalCA5bCKXkLXtxu00ftsmtN8G"
);

const CheckoutForm = ({ clientSecret, product, lensType, prescription }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        setPaid(true);
        setMessage("Payment successful!");

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("product", product._id);
        formData.append("totalPrice", product.price);
        formData.append("paymentMethod", "Online");
        formData.append("stripePaymentId", result.paymentIntent.id);

        if (lensType) formData.append("lensType", lensType);
        if (prescription) formData.append("prescription", prescription);

        // ✅ Use API instance instead of localhost
        await API.post("/orders/checkout", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    } catch (err) {
      setMessage("Payment failed");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
    >
      {!paid && <PaymentElement />}
      {paid && (
        <div
          style={{
            padding: "1rem",
            background: "linear-gradient(90deg, #6a11cb, #2575fc, #ff7e5f)",
            color: "white",
            borderRadius: "12px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 0 15px rgba(255,255,255,0.5)",
          }}
        >
          Order placed successfully
        </div>
      )}
      <button
        type="submit"
        disabled={loading || paid}
        style={{
          background: "linear-gradient(135deg, #6a11cb, #ff416c)",
          color: "white",
          border: "none",
          padding: "0.8rem",
          borderRadius: "50px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(255,65,108,0.5)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,65,108,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(255,65,108,0.5)";
        }}
      >
        {loading ? "Processing..." : paid ? "Paid" : "Pay Now"}
      </button>
      {message && (
        <p
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "500",
            textShadow: "0 0 5px rgba(0,0,0,0.4)",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
};

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const { lensType = "", prescription = null } = location.state || {};

  const [product, setProduct] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data.data);

        // ✅ Use API instance for Stripe Payment Intent
        const paymentRes = await API.post("/payment/create-payment-intent", {
          amount: res.data.data.price * 100,
        });
        setClientSecret(paymentRes.data.clientSecret);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #6a11cb 60%, #ff416c 100%)",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );

  if (!product)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #6a11cb 60%, #ff416c 100%)",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        Product not found
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "3rem 1rem",
        background: "linear-gradient(135deg, #6a11cb 60%, #ff416c 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2.5rem",
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h3
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #f7971e, #ffd200, #ff4e50, #1e3c72)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "default",
            textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
            animation: "colorShift 6s ease infinite",
            transition: "transform 0.3s ease, text-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.textShadow = "4px 4px 15px rgba(0,0,0,0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.textShadow = "2px 2px 10px rgba(0,0,0,0.7)";
          }}
        >
          Checkout
        </h3>

        <style>{`
          @keyframes colorShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        <p style={{ fontWeight: "500" }}>
          <strong>Product:</strong> {product.name}
        </p>
        <p style={{ fontWeight: "500" }}>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p style={{ fontWeight: "500" }}>
          <strong>Lens Type:</strong> {lensType || "None"}
        </p>
        <p style={{ fontWeight: "500" }}>
          <strong>Prescription:</strong> {prescription ? "Uploaded" : "Not uploaded"}
        </p>

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              product={product}
              lensType={lensType}
              prescription={prescription}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
