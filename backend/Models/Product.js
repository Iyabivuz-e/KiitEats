// ***********CREATE PRODUCT TABLE**********
const createProductTable = async (db) => {
  try {
    // Check if the product table already exists
    const [existingTables] = await db.execute("SHOW TABLES LIKE 'product'");
    if (existingTables.length > 0) {
      console.log("Product table already exists");
      return;
    }

    const q = `
      CREATE TABLE product (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        prodName VARCHAR(45) NOT NULL,
        prodImage VARCHAR(100) NOT NULL,
        prodAddress VARCHAR(45) NOT NULL,
        prodDescription VARCHAR(255) NOT NULL,
        prodPrice INT NOT NULL
      )`;

    await db.execute(q);
    console.log("Product table is created");
  } catch (err) {
    console.error(err);
  }
};

module.exports = createProductTable;
