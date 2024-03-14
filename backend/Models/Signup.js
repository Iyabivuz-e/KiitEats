const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  repeatPassword: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  verification_token: { type: String },
  verified: { type: Boolean, default: false },
});

const SignUp = mongoose.model("SignUp", signUpSchema);

module.exports = SignUp;
