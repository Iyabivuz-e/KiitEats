const router = require("express").Router();

const stripePay = require("../Controllers/stripePayment");
router.route("/payment").post(stripePay);

module.exports = router;
