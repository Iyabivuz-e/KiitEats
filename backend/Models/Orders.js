const ordersTable = async (db) => {
  try {
    await db.query("USE KiitEats");
    await db.query(`
       CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255) NOT NULL UNIQUE,
        products JSON,
        amount DECIMAL(10, 2) NOT NULL,
        address JSON NOT NULL,
        status VARCHAR(255) DEFAULT 'Pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("order table created successfully");
  } catch (error) {
    console.error("Error creating order table:", error);
  }
};
module.exports = ordersTable;
