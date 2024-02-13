const cartTable = async (db) => {
  try {
    await db.query("USE KiitEats");
    await db.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        itemId INT NOT NULL,
        quantity INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES signup(id),
        FOREIGN KEY (itemId) REFERENCES product(id)
      )
    `);
    console.log("cart table created successfully");
  } catch (error) {
    console.error("Error creating cart table:", error);
  }
};
module.exports = cartTable;