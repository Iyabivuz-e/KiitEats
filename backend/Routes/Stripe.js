const router = require("express").Router();
const stripePay = require("../Controllers/stripePayment")

router.post("/payment", stripePay);

module.exports = router;
