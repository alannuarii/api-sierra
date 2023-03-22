const mysql = require("mysql");
const env = require("../utils/env");

const db = mysql.createConnection({
  host: env.host,
  user: env.user,
  password: env.password,
  database: env.database,
});

module.exports = db;