// ***************LOGIN / REGISTER**************
// Register a user
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const uuid = require("uuid");

const registerUser = async (db, req, res) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    } // Destructure req.body into individual fields

    if (typeof password !== "string" || password.length === 0) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const verificationToken = uuid.v4(); // Generating verification token
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into database with verification token
    const [result] = await db.query(
      "INSERT INTO signUp (username, email, password, verification_token) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, verificationToken]
    );
    const userId = result.insertId;

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      // configure email details
      from: process.env.EMAIL,
      to: email, // Use email from req.body
      subject: "Email Verification",
      html: `<p>Click <a href="http://locahost/api/user/register/verify/${verificationToken}">here</a> to verify your email.</p>`,
    };
    await transporter.sendMail(mailOptions);
    // Changing the status of the user when  the email is verified
    await db.query(
      "UPDATE signUp SET verified = true WHERE verification_token = ?",
      [verificationToken]
    );
    console.log(`The email is verified ${verificationToken}`);

    res.status(200).json({
      userId, // Include the user ID in the response
      message:
        "User registered successfully. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};


// Login a user
const loginUser = async (db, req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user data from signUp table in the database
    const [userData] = await db.query("SELECT * FROM signUp WHERE email = ?", [
      email,
    ]);
    if (!userData) {
      return res.status(404).json({ sucess: false, message: "User not found" });
    }

    const hashedPassword = userData[0].password;

    // Compare hashed password with provided password
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({ sucess: false, message: "Invalid credentials" });
    }

    // Check if user is verified
    const isVerified = userData[0].verified;
    if (!isVerified) {
      return res.status(403).json({ sucess: false, message: "Email not verified" });
    }

    // Proceed with login
    const userId = userData[0].id;
    const token = uuid.v4();
    await db.query("INSERT INTO sessions (userId, token) VALUES (?, ?)", [
      userId,
      token,
    ]);

    res.status(200).json({sucess: true, message: "Login successful", userId, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ sucess: false, message: "Error logging in user" });
  }
};

module.exports = { registerUser, loginUser };
