const router = require("express").Router();
const [
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
] = require("../Controllers/users");

// Get All the User
router.get("/", getAllUsers);

// Get a single User
router.get("/:id", getSingleUser);

// Delete the User
router.delete("/:id", deleteUser);
// Update the User
router.put("/:id", updateUser);

module.exports = router;
