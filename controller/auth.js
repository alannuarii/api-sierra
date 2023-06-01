const db = require("../db/connection");
const authUtils = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashPassword = await authUtils.setPassword(password);
  const sql = `INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)`;
  const values = [name, email, hashPassword, role];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(400).json({ message: "Gagal input data" });
    } else {
      res.status(200).json({ message: "Data berhasil dikirim" });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [email], async (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    if (result.length < 1) {
      return res.status(401).json({
        message: "Email tidak ditemukan",
      });
    }
    const checkPassword = await authUtils.checkPassword(password, result[0].password);
    if (checkPassword) {
      const token = jwt.sign(
        {
          id_user: result[0].id_user,
          name: result[0].name,
          email: result[0].email,
          role: result[0].role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      const response = {
        message: "Login berhasil",
        access_token: token,
      };
      return res.status(200).json(response);
    } else {
      return res.status(401).json({
        message: "Password tidak sesuai",
      });
    }
  });
};

module.exports = { login, register };
