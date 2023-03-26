const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");
const { cacheMiddleware } = require("../utils/cache");

// Auth Route
router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;
