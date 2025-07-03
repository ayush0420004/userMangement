import React from "react";
import { api } from "../api";

const UserTable = ({ users, fetchUsers, setSelectedUser }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/${id}`);
      fetchUsers();
    } catch {
      alert("Error deleting user");
    }
  };

  return (
    <div style={tableWrapperStyle}>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={thStyle}>First</th>
            <th style={thStyle}>Last</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>PAN</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={rowStyle}>
              <td style={tdStyle}>{u.first_name}</td>
              <td style={tdStyle}>{u.last_name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.phone_number}</td>
              <td style={tdStyle}>••••••••••</td>
              <td style={tdStyle}>
                <button
                  onClick={() => setSelectedUser(u)}
                  style={editBtnStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={deleteBtnStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Styles

const tableWrapperStyle = {
  overflowX: "auto", // Enables horizontal scroll on small screens
  padding: "10px",
  width: "100%",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px", // Avoid squishing on small screens
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const headerRowStyle = {
  backgroundColor: "#f1f1f1",
};

const rowStyle = {
  borderBottom: "1px solid #eee",
};

const thStyle = {
  textAlign: "left",
  padding: "12px 10px",
  fontWeight: "bold",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px 10px",
  fontSize: "14px",
};

const editBtnStyle = {
  marginRight: "8px",
  padding: "6px 10px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007BFF",
  color: "#fff",
  cursor: "pointer",
};

const deleteBtnStyle = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#DC3545",
  color: "#fff",
  cursor: "pointer",
};

export default UserTable;
