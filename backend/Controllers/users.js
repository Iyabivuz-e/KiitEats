const db = require("../Database/database");

// ***********GET ALL USERS**********
const getAllUsers = async (req, res) => {
  try {
    await new Promise((resolve, reject) =>
      db.query("USE KiitEats", (err) => {
        if (err) reject(err);
        else resolve();
      })
    );

    const q = "SELECT * FROM userDetails";
    await new Promise((resolve, reject) =>
      db.query(q, (err, data) => {
        if (err) reject(err);
        else {
          res.status(200).json(data);
          resolve();
        }
      })
    );
  } catch (err) {
    console.error(err);
  }
};

// ***********GET A SINGLE User**********
const getSingleUser = async (req, res) => {
  try {
    const prodId = req.params.id;

    if (!prodId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const q = `SELECT * FROM userDetails WHERE id = ?`;
    const value = prodId;

    const result = await db.query(q, [value]);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const User = result[0]; // Assume first row is the User
    res.status(200).json(User);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ***********DELETE A User**********
const deleteUser = async (req, res) => {
  try {
    await new Promise((resolve, reject) =>
      db.query("USE KiitEats", (err) => {
        if (err) reject(err);
        else resolve();
      })
    );

    const prodId = req.params.id;
    console.log(prodId);

    const q = `DELETE FROM userDetails WHERE id = ? `;
    const value = prodId;
    await new Promise((resolve, reject) =>
      db.query(q, [value], (err, data) => {
        if (err) reject(err);
        else {
          res.status(200).json("User deleted sucessfully");
          resolve();
        }
      })
    );
  } catch (err) {
    console.error(err);
  }
};

// ***********UPDAE A User**********

// const updateUser = async (req, res) => {
//   try {
//     // Input validation:
//     if (!req.body.prodName || !req.body.id) {
//       return res
//         .status(400)
//         .json({ message: "User name and ID are required" });
//     }

//     // Use promise-compatible db.query directly:
//     const result = await db.query(
//       "UPDATE User SET prodName = ? WHERE id = ?",
//       [req.body.prodName, req.body.id]
//     );

//     // Check for successful update:
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     } else if (result.error) {
//       console.error(result.error);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     // Send success response:
//     res
//       .status(200)
//       .json({ message: `User ${req.body.id} updated successfully` });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const updateUser = async (req, res) => {
  try {
    await new Promise((resolve, reject) =>
      db.query("USE KiitEats", (err) => {
        if (err) reject(err);
        else resolve();
      })
    );

    if (!req.body.prodName) {
      return res.status(400).json({ message: "User name is required" });
    }
    const q = "UPDATE userDetails SET prodName = ? WHERE id = ?";
    const values = [req.body.username,req.body.email, req.body.password ,req.params.id];
    await new Promise((resolve, reject) =>
      db.query(q, values, (err, data) => {
        if (err) reject(err);
        else {
          res.status(200).json(`A User has been updated succesfully`);
          resolve();
        }
      })
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = [
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
];
