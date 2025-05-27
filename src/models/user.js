const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tempPassword: { type: String, required: true },
    role: { type:String, required: true , enum:['user' ,'admin' , 'seller'] , deafult:'user' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
