const mysql = require("mysql2/promise");
const createProductTable = require("../Models/Product");
const userTable = require("../Models/User");
const cartTable = require("../Models/Cart");
const ordersTable = require("../Models/Orders");
require("dotenv").config();

// Create a connection pool using promise-based MySQL client
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "KiitEats",
});

// Connect to the database
db.getConnection()
  .then(async (connection) => {
    await connection.query("CREATE DATABASE IF NOT EXISTS KiitEats");
    connection.release();

    // Calling the tables creation functions
    await userTable(db);
    await createProductTable(db);
    await cartTable(db);
    await ordersTable(db);
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

module.exports = db;
