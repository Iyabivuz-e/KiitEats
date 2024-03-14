// authController.js
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
// const Login = require("../Models/Login");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin, repeatPassword } =
      req.body || {};

    if (!username || !email || !password || !repeatPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof password !== "string" || password.length === 0) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const verificationToken = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      repeatPassword: hashedPassword,
      isAdmin,
      verificationToken,
    });
    console.log("New User with verification Token:", newUser);

    await newUser.save();
    req.session.userId = newUser._id;
    console.log("User ID set in session:", req.session.userId);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `<p>Click <a href="http://localhost/api/user/register/verify/${verificationToken}">here</a> to verify your email.</p>`,
    };

    res.status(200).json({
      userId: newUser._id, // Use _id instead of insertId
      message:
        "User registered successfully. Please check your email for verification.",
    });
    await transporter.sendMail(mailOptions);
    // Update user in the database to mark as verified
    await User.updateOne({ email: email }, { $set: { verified: true } });

    console.log(`The email is verified ${verificationToken}`);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res
        .status(403)
        .json({ success: false, message: "Email not verified" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECR,
      {
        expiresIn: "3d", // Token expires in 3days
      }
    );

    // You may choose to store the token in a secure HTTPOnly cookie
    // res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Alternatively, you can send the token in the response body
    res.status(200).json({
      success: true,
      message: "Login successful",
      userId: user._id,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Error logging in user" });
  }
};

const logOutUser = async (req, res) => {
  try {
    // Destroy the user's session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out user:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error logging out user" });
      }
      res.clearCookie("sessionID"); // Clear the session cookie
      res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ success: false, message: "Error logging out user" });
  }
};


module.exports = { registerUser, loginUser, logOutUser };
