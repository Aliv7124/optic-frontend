/*
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { Modal, Button, Form } from "react-bootstrap";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("inventory");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    category: "", 
  });

  // ---------------- Image Modal for Orders ----------------
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // ---------------- Load Data ----------------
  useEffect(() => {
    loadProducts();
    loadOrders();
    loadProfile();
    loadMessages();
  }, []);

  // ---------------- Load Functions ----------------
  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await API.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await API.get("/admin/orders");
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await API.get("/admin/profile");
      setProfile(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await API.get("/contact");
      setMessages(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await API.delete(`/contact/${id}`);
      loadMessages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  // ---------------- Handlers ----------------
  const logout = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin-login");
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", price: "", image: null, category: "" });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      price: p.price,
      image: null,
      category: p.category?.toLowerCase() || "",
    });
    setShowModal(true);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("category", form.category);
      if (form.image) fd.append("image", form.image);

      if (editProduct) {
        await API.patch(`/admin/product/${editProduct._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/admin/add-product", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await API.delete(`/admin/product/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.patch("/admin/profile", profile);
      alert("Profile updated successfully!");
      loadProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="d-flex min-vh-100">
      
      <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: 260 }}>
        <h4 className="mb-4">MS ADMIN</h4>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("inventory")}>Inventory</button>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("orders")}>Orders</button>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("messages")}>Messages</button>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("settings")}>Settings</button>
        <button className="btn btn-danger w-100 mt-auto" onClick={logout}>Logout</button>
      </div>

      
      <div className="flex-grow-1 p-4 overflow-auto">
    
        {tab === "inventory" && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h3>Inventory</h3>
              <Button onClick={openAdd}>Add Product</Button>
            </div>
            {loadingProducts ? (
              <div>Loading...</div>
            ) : products.length === 0 ? (
              <div>No products found.</div>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>₹{p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.image && <img src={`http://localhost:5001${p.image}`} width="50" alt={p.name} />}</td>
                      <td>
                        <Button size="sm" onClick={() => openEdit(p)}>Edit</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => deleteProduct(p._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

       
{tab === "orders" && (
  <>
    <h3>Orders</h3>
    {loadingOrders ? (
      <div>Loading...</div>
    ) : orders.length === 0 ? (
      <div>No orders found.</div>
    ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Lens Type</th>
            <th>Prescription</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.user?.name || "N/A"}</td>
              <td>{o.user?.phone || "N/A"}</td>
              <td>{o.product?.name || "N/A"}</td>
              <td>
                {o.product?.image ? (
                  <img
                    src={`http://localhost:5001${o.product.image}`}
                    alt={o.product.name}
                    width="50"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalImage(`http://localhost:5001${o.product.image}`);
                      setShowImageModal(true);
                    }}
                  />
                ) : "N/A"}
              </td>
              <td>₹{o.totalPrice || 0}</td>
              <td>{o.lensType || "N/A"}</td>
              <td>
                {o.prescription ? (
                  <Button
                    size="sm"
                    variant="primary"
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
                      } catch (err) {
                        console.error(err);
                        alert("Failed to download prescription");
                      }
                    }}
                  >
                    Download
                  </Button>
                ) : "-"}
              </td>
              <td>{o.paymentStatus || "Pending"}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={async () => {
                    if (!window.confirm("Are you sure you want to delete this order?")) return;
                    try {
                      await API.delete(`/admin/order/${o._id}`);
                      alert("Order deleted successfully!");
                      loadOrders(); // refresh orders list
                    } catch (err) {
                      console.error(err);
                      alert("Failed to delete order");
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
)}



        
        {tab === "messages" && (
          <>
            <h3>Contact Messages</h3>
            {loadingMessages ? (
              <div>Loading...</div>
            ) : messages.length === 0 ? (
              <div>No messages found.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Prescription</th>
                      <th>Broken Frame</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>{msg.name}</td>
                        <td>{msg.phone}</td>
                        <td>{msg.message}</td>
                        <td>
                          {msg.prescription ? (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={async () => {
                                try {
                                  const path = msg.prescription.startsWith("/")
                                    ? `http://localhost:5001${msg.prescription}`
                                    : `http://localhost:5001/${msg.prescription}`;
                                  const res = await fetch(path);
                                  if (!res.ok) throw new Error("File not found");
                                  const blob = await res.blob();
                                  const link = document.createElement("a");
                                  link.href = window.URL.createObjectURL(blob);
                                  link.download = msg.prescription.split("/").pop();
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                } catch (err) {
                                  console.error(err);
                                  alert("Failed to download prescription");
                                }
                              }}
                            >
                              Download
                            </button>
                          ) : "-"}
                        </td>
                        <td>
                          {msg.brokenFrame ? (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={async () => {
                                try {
                                  const path = msg.brokenFrame.startsWith("/")
                                    ? `http://localhost:5001${msg.brokenFrame}`
                                    : `http://localhost:5001/${msg.brokenFrame}`;
                                  const res = await fetch(path);
                                  if (!res.ok) throw new Error("File not found");
                                  const blob = await res.blob();
                                  const link = document.createElement("a");
                                  link.href = window.URL.createObjectURL(blob);
                                  link.download = msg.brokenFrame.split("/").pop();
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                } catch (err) {
                                  console.error(err);
                                  alert("Failed to download broken frame");
                                }
                              }}
                            >
                              Download
                            </button>
                          ) : "-"}
                        </td>
                        <td>{new Date(msg.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteMessage(msg._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

     
        {tab === "settings" && (
          <>
            <h3>Admin Settings</h3>
            {loadingProfile ? <div>Loading...</div> : profile ? (
              <Form onSubmit={updateProfile}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password if you want to change" value={profile.password || ""} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" value={profile.notes || ""} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} />
                </Form.Group>
                <Button type="submit" variant="dark">Save Changes</Button>
              </Form>
            ) : <div>Error loading profile.</div>}
          </>
        )}
      </div>

     
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitProduct}>
            <Form.Control className="mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Form.Control className="mb-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <Form.Control as="select" className="mb-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
              <option value="">Select Category</option>
              <option value="eyeglasses">Eyeglasses</option>
              <option value="sunglasses">Sunglasses</option>
            </Form.Control>
            <Form.Control className="mb-3" type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
            <Button type="submit">{editProduct ? "Save" : "Add"}</Button>
          </Form>
        </Modal.Body>
      </Modal>

     
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Body className="text-center">
          {modalImage && <img src={modalImage} alt="Product" style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
*/



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { Modal, Button, Form } from "react-bootstrap";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("inventory");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    category: "", 
  });

  // ---------------- Image Modal for Orders ----------------
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // ---------------- Load Data ----------------
  useEffect(() => {
    loadProducts();
    loadOrders();
    loadProfile();
    loadMessages();
  }, []);

  // ---------------- Load Functions ----------------
  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await API.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await API.get("/admin/orders");
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await API.get("/admin/profile");
      setProfile(res.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const res = await API.get("/contact");
      setMessages(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await API.delete(`/contact/${id}`);
      loadMessages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  // ---------------- Handlers ----------------
  const logout = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin-login");
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", price: "", image: null, category: "" });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      price: p.price,
      image: null,
      category: p.category?.toLowerCase() || "",
    });
    setShowModal(true);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("category", form.category);
      if (form.image) fd.append("image", form.image);

      if (editProduct) {
        await API.patch(`/admin/product/${editProduct._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/admin/add-product", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await API.delete(`/admin/product/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.patch("/admin/profile", profile);
      alert("Profile updated successfully!");
      loadProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="d-flex min-vh-100">
      
      <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: 260 }}>
        <h4 className="mb-4">MS ADMIN</h4>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("inventory")}>Inventory</button>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("orders")}>Orders</button>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("messages")}>Messages</button>
        <button className="btn btn-dark w-100 mb-2" onClick={() => setTab("settings")}>Settings</button>
        <button className="btn btn-danger w-100 mt-auto" onClick={logout}>Logout</button>
      </div>

      
      <div className="flex-grow-1 p-4 overflow-auto">
    
        {tab === "inventory" && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h3>Inventory</h3>
              <Button onClick={openAdd}>Add Product</Button>
            </div>
            {loadingProducts ? (
              <div>Loading...</div>
            ) : products.length === 0 ? (
              <div>No products found.</div>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>₹{p.price}</td>
                      <td>{p.category}</td>
                      <td>{p.image && <img src={`http://localhost:5001${p.image}`} width="50" alt={p.name} />}</td>
                      <td>
                        <Button size="sm" onClick={() => openEdit(p)}>Edit</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => deleteProduct(p._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

      {tab === "orders" && (
  <>
    <h3>Orders</h3>

    {loadingOrders ? (
      <div>Loading...</div>
    ) : orders.length === 0 ? (
      <div>No orders found.</div>
    ) : (
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Lens Type</th>
            <th>Prescription</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

       <tbody>
  {orders.map((o) => (
    <tr key={o._id}>
      <td>{o.user?.name || "N/A"}</td>
      <td>{o.user?.phone || "N/A"}</td>
      <td>{o.product?.name || "N/A"}</td>
      <td>
        {o.product?.image ? (
          <img
            src={`http://localhost:5001${o.product.image}`}
            alt="product"
            width="50"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalImage(`http://localhost:5001${o.product.image}`);
              setShowImageModal(true);
            }}
          />
        ) : (
          "N/A"
        )}
      </td>
      <td>₹{o.totalPrice || 0}</td>
      <td>{o.lensType || "N/A"}</td>
      <td>
        {o.prescription ? (
          <Button
            size="sm"
            onClick={async () => {
              try {
                const res = await fetch(
                  `http://localhost:5001${o.prescription}`
                );
                const blob = await res.blob();
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = o.prescription.split("/").pop();
                link.click();
              } catch {
                alert("Failed to download");
              }
            }}
          >
            Download
          </Button>
        ) : (
          "-"
        )}
      </td>

      {/* PAYMENT STATUS */}
      <td>{o.paymentStatus || "Pending"}</td>

      {/* ORDER STATUS */}
      <td>
        <span
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
        </span>
      </td>

      {/* ACTIONS */}
      <td>
        {!o.status || o.status === "Pending" ? (
          <>
            <Button
              size="sm"
              variant="success"
              className="me-2"
              onClick={async () => {
                try {
                  await API.put(`/admin/order/${o._id}/status`, {
                    status: "Accepted",
                  });
                  loadOrders();
                } catch {
                  alert("Accept failed");
                }
              }}
            >
              Accept
            </Button>

            <Button
              size="sm"
              variant="warning"
              onClick={async () => {
                try {
                  await API.put(`/admin/order/${o._id}/status`, {
                    status: "Rejected",
                  });
                  loadOrders();
                } catch {
                  alert("Reject failed");
                }
              }}
            >
              Reject
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="danger"
            onClick={async () => {
              if (!window.confirm("Delete this order?")) return;
              try {
                await API.delete(`/admin/order/${o._id}`);
                loadOrders();
              } catch {
                alert("Delete failed");
              }
            }}
          >
            Delete
          </Button>
        )}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    )}
  </>
)}

        
        {tab === "messages" && (
          <>
            <h3>Contact Messages</h3>
            {loadingMessages ? (
              <div>Loading...</div>
            ) : messages.length === 0 ? (
              <div>No messages found.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Prescription</th>
                      <th>Broken Frame</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>{msg.name}</td>
                        <td>{msg.phone}</td>
                        <td>{msg.message}</td>
                        <td>
                          {msg.prescription ? (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={async () => {
                                try {
                                  const path = msg.prescription.startsWith("/")
                                    ? `http://localhost:5001${msg.prescription}`
                                    : `http://localhost:5001/${msg.prescription}`;
                                  const res = await fetch(path);
                                  if (!res.ok) throw new Error("File not found");
                                  const blob = await res.blob();
                                  const link = document.createElement("a");
                                  link.href = window.URL.createObjectURL(blob);
                                  link.download = msg.prescription.split("/").pop();
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                } catch (err) {
                                  console.error(err);
                                  alert("Failed to download prescription");
                                }
                              }}
                            >
                              Download
                            </button>
                          ) : "-"}
                        </td>
                        <td>
                          {msg.brokenFrame ? (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={async () => {
                                try {
                                  const path = msg.brokenFrame.startsWith("/")
                                    ? `http://localhost:5001${msg.brokenFrame}`
                                    : `http://localhost:5001/${msg.brokenFrame}`;
                                  const res = await fetch(path);
                                  if (!res.ok) throw new Error("File not found");
                                  const blob = await res.blob();
                                  const link = document.createElement("a");
                                  link.href = window.URL.createObjectURL(blob);
                                  link.download = msg.brokenFrame.split("/").pop();
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                } catch (err) {
                                  console.error(err);
                                  alert("Failed to download broken frame");
                                }
                              }}
                            >
                              Download
                            </button>
                          ) : "-"}
                        </td>
                        <td>{new Date(msg.createdAt).toLocaleString()}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteMessage(msg._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

     
        {tab === "settings" && (
          <>
            <h3>Admin Settings</h3>
            {loadingProfile ? <div>Loading...</div> : profile ? (
              <Form onSubmit={updateProfile}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password if you want to change" value={profile.password || ""} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" value={profile.notes || ""} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} />
                </Form.Group>
                <Button type="submit" variant="dark">Save Changes</Button>
              </Form>
            ) : <div>Error loading profile.</div>}
          </>
        )}
      </div>

     
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitProduct}>
            <Form.Control className="mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Form.Control className="mb-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <Form.Control as="select" className="mb-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
              <option value="">Select Category</option>
              <option value="eyeglasses">Eyeglasses</option>
              <option value="sunglasses">Sunglasses</option>
            </Form.Control>
            <Form.Control className="mb-3" type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
            <Button type="submit">{editProduct ? "Save" : "Add"}</Button>
          </Form>
        </Modal.Body>
      </Modal>

     
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Body className="text-center">
          {modalImage && <img src={modalImage} alt="Product" style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;