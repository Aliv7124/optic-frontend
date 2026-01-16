import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import EyeglassesPage from './pages/Eyeglasses';
import SunglassesPage from './pages/Sunglasses';
import Login from './pages/Login'; 
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
// Admin Protected Route
const AdminProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAdminAuthenticated") === "true";
  if (!isAuth) return <Navigate to="/admin-login" replace />;
  return children;
};

// User Protected Route (for Buy Now)
const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />; // redirect to user login
  return children;
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-body text-body">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eyeglasses" element={<EyeglassesPage />} />
            <Route path="/sunglasses" element={<SunglassesPage />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/product/:id" element={<ProductDetails />} />
            <Route 
  path="/checkout/:id" 
  element={
    <UserProtectedRoute>
      <Checkout />
    </UserProtectedRoute>
  }
/>
       <Route 
  path="/profile" 
  element={
    <UserProtectedRoute>
      <UserProfile />
    </UserProtectedRoute>
  } 
/>


            {/* Admin */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />

            {/* User */}
            <Route path="/login" element={<Login/>} />
            {/* Example of a page requiring user login, e.g., checkout */}
            <Route 
              path="/checkout" 
              element={
                <UserProtectedRoute>
                  <h2>Checkout Page (only for logged-in users)</h2>
                </UserProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
