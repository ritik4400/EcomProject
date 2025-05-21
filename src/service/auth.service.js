const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserService = async ({ username, email, password, role }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists. Please log in.");
    error.statusCode = 409;
    throw error;
  }

  if (!password) {
    const error = new Error("Password is required.");
    error.statusCode = 400;
    throw error;
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
  return user;
};

const loginService = async ({email, password}) => {
  const user = await User.findOne({ email });
  if (!user) {
    // return res.status(400).json({ message: "Invalid credentials" });
    const error = new Error("user not found")
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // return res.status(400).json({ message: "Invalid credentials" });
    const error = new Error("password not match");
    error.statusCode = 400;
    throw error;
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = {
  registerUserService,
  loginService,
};
