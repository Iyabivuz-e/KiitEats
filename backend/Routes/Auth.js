// authRoute.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logOutUser } = require("../Controllers/Auth");

router.post("/register", async (req, res) => {
  await registerUser(req, res);
});

router.post("/login", async (req, res) => {
  await loginUser(req, res);
});

router.get("/logout", async (req, res) => {
  await logOutUser(req, res);
});

module.exports = router;
