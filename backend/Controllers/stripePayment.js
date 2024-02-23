const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripePay = async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr", 
    });
    res.status(200).json(charge);
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Error processing payment" });
  }
};

module.exports = stripePay;
