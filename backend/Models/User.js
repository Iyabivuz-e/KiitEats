const userTable = async (db) => {
  try {
    // await db.query("CREATE DATABASE IF NOT EXISTS KiitEats");
    await db.query("USE KiitEats");
    await db.query(`
      CREATE TABLE IF NOT EXISTS signUp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        verification_token VARCHAR(255),
        verified BOOLEAN DEFAULT false -- Include the verified column here
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS logIn (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        token VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES signUp(id) ON DELETE CASCADE
      )
    `);


    
    // ******************ALTERING THE TABLES*********************

    //ADDING THE VERIFICATION TOKEN COLUMN IN THE TABLE
    const [columns] = await db.query(
      "SHOW COLUMNS FROM signUp LIKE 'verification_token'"
    );
    if (columns.length === 0) {
      // If the column doesn't exist, add it
      await db.query(
        "ALTER TABLE signUp ADD COLUMN verification_token VARCHAR(255)"
      );
    }

    //ADDING THE VERIFY EMAIL COLUMN IN THE TABLE
    const [verifiedColumn] = await db.query(
      "SHOW COLUMNS FROM signUp LIKE 'verified'"
    );
    if (verifiedColumn.length === 0) {
      // If the verified column doesn't exist, add it
      await db.query(
        "ALTER TABLE signUp ADD COLUMN verified BOOLEAN DEFAULT false"
      );
    }

    //ADDING THE AN ID COLUMN IN THE TABLE
    const [id] = await db.query("SHOW COLUMNS FROM signUp LIKE 'id'");
    if (id.length === 0) {
      // If the verified column doesn't exist, add it
      await db.query(
        "ALTER TABLE signUp ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY"
      );
      console.log("Id is added");
    }
  } catch (error) {
    console.error("Error setting up tables:", error);
  }
};

module.exports = userTable;
