const express = require("express");
const session = require("express-session");
// const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const MongoStore = require("connect-mongo") // Import connect-mongo
require("dotenv").config();
const db = require("./Database/database");
// const fs = require("fs/promises");
// const bodyParser = require("body-parser")
// const fileUpload = require("express-fileupload");
// const { upload } = require('./utils/multer')
const multer = require("multer");



const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// app.use(bodyParser.json());


// app.use(fileUpload());
// Set up session middleware with Mongoose store
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

// app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
// app.use(require("express-fileupload")());


// Calling the routes (assuming routes are defined in separate files)
const paymentsRoute = require("./Routes/Stripe");
const authRoute = require("./Routes/Auth");
const productsRoute = require("./Routes/product");
const cartRoute = require("./Routes/Cart");
const orderRoute = require("./Routes/Orders");


app.use("/images", express.static("uploads/images"));
//Handling the files using multer
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Applying routes
app.use("/api/stripe", paymentsRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", authRoute);
app.use("/api/products", productsRoute);

// Improved error handling and variable naming in the start function
const start = async () => {
  try {
    await db(process.env.MONGO_URI);
    // console.log("connected to the database");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
