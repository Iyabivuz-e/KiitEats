const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const MongoStore = require("connect-mongo")
require("dotenv").config();
const db = require("./Database/database");
const multer = require("multer");
const port = process.env.PORT || 5000;
const app = express();

// ******CREATING THE EXPRESS SERVER***********
app.use(express.json());

// ******HANDLING THE SESSIONS***********
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use(cors());

// ******CALLING THE ROUTES***********
const paymentsRoute = require("./Routes/Stripe");
const authRoute = require("./Routes/Auth");
const productsRoute = require("./Routes/product");
const cartRoute = require("./Routes/Cart");
const orderRoute = require("./Routes/Orders");

// ******HANDLING IMAGE UPLOAD USING MULTER***********
app.use("/images", express.static("uploads/images"));
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

// ******APPLYING THE ROUTES***********
app.use("/api/stripe", paymentsRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", authRoute);
app.use("/api/products", productsRoute);

// ******STARTING THE SERVER***********
const start = async () => {
  try {
    await db(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
