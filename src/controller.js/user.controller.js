const { updateUserSchema } = require("../validator/userValidator");
// const User = require("../models/user");
const {getUserByIdService  , updateUserService} = require("../service/user.service");

const fetchAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      res.status(404).json({ message: "Users Not Found" });
    }
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate request body
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password, role } = req.body;

    const updateUser = await updateUserService(id,req.body);

    res.status(200).json({ success: true, user:updateUser });
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    console.error("API Error:", error.stack); // Log the error message
    res.status(500).json({ success: false, message: error.message ,
      stack: error.stack});
  }
};

module.exports = {
  fetchAllUser,
  fetchUser,
  updateUser,
};
