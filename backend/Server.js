const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

server.use(express.json());
server.use(cors());

// Calling the routes
const paymentsRoute = require('./Routes/Stripe')
const authRoute = require('./Routes/Auth')
const productsRoute = require('./Routes/product')
const cartRoute = require('./Routes/Cart')
const orderRoute = require('./Routes/Orders')

// Rest APIs
server.use("/api/payments", paymentsRoute);
server.use("/api/orders", orderRoute);
server.use('/api/cart', cartRoute)
server.use('/api/user', authRoute)
server.use('/api/products', productsRoute);


// Listening to the server
const start = async () => {
  try {
    await server.listen(port, () => {
      console.log(`Server is listening to the port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
