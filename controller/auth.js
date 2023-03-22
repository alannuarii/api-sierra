const db = require("../db/connection");
const authUtils = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const env = require("../utils/env");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashPassword = await authUtils.setPassword(password);
  const sql = `INSERT INTO user (name, email, password, role) VALUES ('${name}', '${email}', '${hashPassword}', '${role}')`;
  db.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({ message: "Gagal input data" });
    }
    res.status(200).json({ message: "Data berhasil dikirim" });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM user WHERE email = '${email}'`;
  db.query(sql, async (error, result) => {
    if (result.length < 1) {
      res.status(401).json({
        message: "Email tidak ditemukan",
      });
      return;
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
        env.secretKey,
        { expiresIn: "1h" }
      );
      //   res.header("x-access-token", token);
      res.status(200).json({
        message: "Login berhasil",
        access_token: token,
      });
    } else {
      res.status(401).json({
        message: "Password tidak sesuai",
      });
    }
  });
};

module.exports = { login, register };
