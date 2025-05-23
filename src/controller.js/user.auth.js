const { loginSchema, registerSchema } = require("../validator/userValidator");
const {
  registerUserService,
  loginService,
} = require("../service/auth.service");

//create
const registerUser = async (req, res) => {
  try {
    //input validation
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const { username, email, password, role } = req.body;

    const result = await registerUserService({
      username,
      email,
      password,
      role,
    });

    // Respond with success
    res
      .status(201)
      .json({ message: "User registered successfully", user: result });
    logger.info(`User registration successful for email: ${email}`);
  } catch (error) {
    //  logger.error(`Error in registerUser controller for email ${req.body.email}: ${error.message}`)
    const status = error.statusCode || 500;
    res.status(status).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
    console.error("API Error:", error.message);
  }
};

//login user
const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    res.status(200).json({ message: "Login successful", token: result });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  login,
};
