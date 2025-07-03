import React, { useState, useEffect } from "react";
import { api } from "../api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const defaultForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  pan_number: ""
};

const UserForm = ({ fetchUsers, selectedUser, setSelectedUser }) => {
  const [form, setForm] = useState(defaultForm);
  const [showPAN, setShowPAN] = useState(false);

  useEffect(() => {
    if (selectedUser) setForm(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone_number, pan_number } = form;

    if (!first_name || !last_name || !email || !phone_number || !pan_number)
      return alert("All fields are required");
    if (!validateEmail(email)) return alert("Invalid email");
    if (!validatePhone(phone_number)) return alert("Phone must be 10 digits");
    if (!validatePAN(pan_number)) return alert("Invalid PAN format (e.g., ABCDE1234F)");

    try {
      if (selectedUser) {
        await api.put(`/${form.id}`, form);
      } else {
        await api.post("/", form);
      }

      alert("User saved successfully ✅");
      setForm(defaultForm);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
      alert("Error saving user ❌");
    }
  };

  return (
    <div style={outerWrapper}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>{selectedUser ? "Edit User" : "Add User"}</h2>

        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div style={panWrapperStyle}>
          <input
            name="pan_number"
            placeholder="PAN Number"
            value={showPAN ? form.pan_number : "*".repeat(form.pan_number.length)}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginBottom: "0", flex: 1 }}
          />
          <button
            type="button"
            onClick={() => setShowPAN(!showPAN)}
            style={iconButtonStyle}
          >
            {showPAN ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" style={submitButtonStyle}>
          {selectedUser ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

// 🧩 Styles
const outerWrapper = {
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  width: "100%"
};

const formStyle = {
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column"
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "22px"
};

const inputStyle = {
  padding: "10px",
  marginBottom: "15px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
  boxSizing: "border-box"
};

const panWrapperStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "15px"
};

const iconButtonStyle = {
  marginLeft: "8px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "8px"
};

const submitButtonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%"
};

export default UserForm;
