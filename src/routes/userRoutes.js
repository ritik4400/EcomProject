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
route.get("/request",authMiddleware ,authorizeRoles('admin' , 'seller'), fetchAllUser);

//GET SPECIFIC ID
route.get("/request/:id",authMiddleware,authorizeRoles('admin'), fetchUser);
//update
route.put("/update/:id",authMiddleware, authorizeRoles('admin'), updateUser);

module.exports = route;
