const fs = require("fs");
const XLSX = require("xlsx");
const User = require("../models/userModel");
const { validateUser, validateExcelRow } = require("../utils/validator");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("User creation error:", err.message);
    res.status(500).json({ error: "User creation failed." });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await User.update(req.body, { where: { id } });
    res.json({ message: "User updated" });
  } catch (err) {
    console.error("User update error:", err.message);
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("User deletion error:", err.message);
    res.status(500).json({ error: "Delete failed" });
  }
};

exports.bulkUpload = async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ error: "Excel file is empty or invalid" });
    }

    const errors = [];
    const validUsers = [];

    rows.forEach((row, idx) => {
      const { error } = validateExcelRow(row);
      if (error) {
        errors.push(`Row ${idx + 2}: ${error.details[0].message}`);
      } else {
        validUsers.push(row);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await User.bulkCreate(validUsers, { validate: true });

    res.status(200).json({ message: "Bulk upload successful ✅" });
  } catch (err) {
    console.error("Bulk upload error:", err.message);
    res.status(500).json({ error: "Bulk insert failed" });
  } finally {
    // Delete uploaded temp file
    if (file && file.path) {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Temp file deletion error:", err.message);
      });
    }
  }
};

exports.downloadSample = (req, res) => {
  try {
    const data = [
      {
        "First Name": "John",
        "Last Name": "Doe",
        "Email": "john@example.com",
        "Phone Number": "9876543210",
        "PAN Number": "ABCDE1234F",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const filePath = "sample.xlsx";
    XLSX.writeFile(workbook, filePath);
    res.download(filePath);
  } catch (err) {
    console.error("Download sample error:", err.message);
    res.status(500).json({ error: "Could not download sample file" });
  }
};
