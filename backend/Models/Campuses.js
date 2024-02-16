// // ***********CREATE PRODUCT TABLE**********
// const createCampusTable= async (db) => {
//   try {
//     // Check if the product table already exists
//     const [existingTables] = await db.query("SHOW TABLES LIKE 'campuses'");
//     if (existingTables.length > 0) {
//       console.log("Campuses table already exists");
//       return;
//     }

//     // If the product table doesn't exist, create it
//     await new Promise((resolve, reject) =>
//       db.query("USE KiitEats", (err) => {
//         if (err) reject(err);
//         else resolve();
//       })
//     );

//     const q =
//       "CREATE TABLE campuses (id INT AUTO_INCREMENT PRIMARY KEY, prodName VARCHAR(45) NOT NULL)";
//     await new Promise((resolve, reject) =>
//       db.query(q, (err, data) => {
//         if (err) reject(err);
//         else {
//           console.log("Campuses table is created");
//           resolve();
//         }
//       })
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = createCampusTable;
