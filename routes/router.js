const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const auth = require("../controller/auth");

// Auth Route
router.post("/login", upload.none(), auth.login);
router.post("/register", upload.none(), auth.register);

module.exports = router;
