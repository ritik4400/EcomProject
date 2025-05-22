const express = require("express");
const route = express.Router();
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

route.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

const { registerUser, login } = require("../controller.js/user.auth");
//Auth Routes
route.post("/register", registerUser);
route.post("/login", login);

route.get("/", (req, res) => {
  res.render("index");
});

const {
  fetchAllUser,
  fetchUser,
  updateUser,
} = require("../controller.js/user.controller");
//get all
route.get("/request", fetchAllUser);

//GET SPECIFIC ID
route.get("/request/:id", fetchUser);
//update
route.put("/update/:id", updateUser);

module.exports = route;
