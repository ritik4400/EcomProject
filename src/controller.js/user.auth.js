const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const {
    loginSchema,
  registerSchema,
} = require("../validator/userValidator");

//create
const registerUser = async (req, res) => {
  try {
    //input validation
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ messege: error.details[0].messege });
    }

    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please log in." });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      tempPassword: password,
      role: role || "user",
    });

    // Respond with success
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
    console.error("API Error:", error.message);
  }
};

//login user
const login =  async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
    registerUser,
    login
}
