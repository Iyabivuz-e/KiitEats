const uuid = require('uuid');

const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: "2023-10-16",
});

const stripePay = async (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRODUCT", product.prodPrice);

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.paymentIntents.create({
      amount: product.prodPrice * 100,
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.prodName}`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country,
          city: token.card.address_city,
          postal_code: token.card.address_zip,
          line1: token.card.address_line1,
          phone: token.card.phone_number,
        }
      }
    }, { idempotencyKey: token.card.id})
  })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
}

module.exports = stripePay;
