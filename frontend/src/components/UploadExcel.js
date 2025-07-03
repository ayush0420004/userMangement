import React from "react";
import { api } from "../api";

const UploadExcel = ({ fetchUsers }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // 👈 Match with `upload.single("file")`

    try {
      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Upload successful ✅");
      fetchUsers();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed ❌");
    }
  };

  const downloadTemplate = () => {
    window.location.href = "http://localhost:5000/api/users/download";
  };

  return (
    <div style={wrapperStyle}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
        style={fileInputStyle}
      />
      <button onClick={downloadTemplate} style={buttonStyle}>
        Download Sample
      </button>
    </div>
  );
};

// ✅ Inline styles

const wrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  marginBottom: "20px",
  width: "100%",
};

const fileInputStyle = {
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff",
  cursor: "pointer",
  flex: "1 1 200px", // Flex-grow for responsiveness
  maxWidth: "300px",
};

const buttonStyle = {
  padding: "10px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  fontSize: "14px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  flex: "1 1 150px",
  maxWidth: "200px",
};

export default UploadExcel;
