const router = require('express').Router()
const db = require("../Database/database");

// Import the controller functions
const { registerUser, loginUser } = require('../Controllers/Auth');

router.post("/register", async (req, res, next) => {
  await registerUser(db, req, res);
});

router.post("/login", async (req, res, next) => {
  await loginUser(db, req, res);
});


// Export the router
module.exports = router;
