import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import UploadExcel from "./components/UploadExcel";
import { api } from "./api";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/");
      setUsers(res.data);
    } catch (err) {
      alert("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        fetchUsers={fetchUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <UploadExcel fetchUsers={fetchUsers} />
      <UserTable
        users={users}
        fetchUsers={fetchUsers}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default App;
