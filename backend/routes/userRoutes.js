const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Upload and download routes - define FIRST
router.post("/upload", upload.single("file"), controller.bulkUpload);
router.get("/download", controller.downloadSample);

// CRUD routes
router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
