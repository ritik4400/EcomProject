const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const logger = require("../config/logger"); // Import your logger


const registerUserService = async ({ username, email, password, role }) => {
  logger.debug(`Attempting to register user with email: ${email}`);
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    logger.warn(
      `Registration failed: User with email ${email} already exists.`
    );
    throw new AppError("User already exists. Please log in.", 409);
  }

  if (!password) {
    logger.warn(
      `Registration failed for email ${email}: Password is required.`
    );
    throw new AppError("Password is required.", 400);
  }

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  logger.debug(`Password hashed for user: ${email}`);

  // Create the user in the database
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    tempPassword: password,
    role: role || "user",
  });
  logger.info(`User successfully registered: ${user.email} (ID: ${user._id})`);
  return user;
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("user not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("password not match", 400);
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
