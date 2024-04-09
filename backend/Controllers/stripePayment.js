const uuid = require("uuid");

const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY, {
  apiVersion: "2023-10-16",
});

const stripePay = (req, res) => {
  stripe.paymentIntents.create(
    {
      source: req.body.tokenId,
      amount: req.body.totalPrice,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log(stripeErr)
      } else {
        res.status(200).json(stripeRes);
        console.log(stripeRes)
      }
    }
  );
};


module.exports = stripePay;


// const uuid = require("uuid");
// const Order = require("../Models/Orders"); // Import the Order schema

// const KEY = process.env.STRIPE_KEY;
// const stripe = require("stripe")(KEY, {
//   apiVersion: "2023-10-16",
// });

// const stripePay = (req, res) => {
//   // Extract shipping address from the request body sent by the frontend
//   const { tokenId, totalPrice, shippingAddress } = req.body;

//   // Create a payment intent with Stripe
//   stripe.paymentIntents.create(
//     {
//       source: tokenId,
//       amount: totalPrice,
//       currency: "inr",
//     },
//     async (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         console.log(stripeErr);
//         return res.status(500).json(stripeErr);
//       } else {
//         // Payment succeeded, save the order to the database
//         try {
//           const order = new Order({
//             products: req.body.products, // Assuming products are sent from frontend
//             totalAmount: totalPrice,
//             customerName: req.body.customerName,
//             customerEmail: req.body.customerEmail,
//             shippingAddress: shippingAddress, // Save shipping address here
//             user: req.body.userId, // Assuming you have userId available in the request
//           });

//           const savedOrder = await order.save();
//           console.log("Order saved successfully:", savedOrder);
//           return res
//             .status(200)
//             .json({ message: "Order saved successfully", order: savedOrder });
//         } catch (error) {
//           console.log("Error saving order:", error);
//           return res.status(500).json({ error: "Error saving order" });
//         }
//       }
//     }
//   );
// };

// module.exports = stripePay;
