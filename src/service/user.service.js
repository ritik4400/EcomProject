const User = require("../models/user");

const getUserByIdService = async (id) =>{
     const user = await User.findById(id);
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    return user
}

const updateUserService = async(id,{username, email, password, role} ) => {
    const updateUser = await User.findByIdAndUpdate(id, {username, email, password, role}, {
      new: true,
    });
    if (!updateUser) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    return updateUser;
}

module.exports = {
    getUserByIdService,
    updateUserService
}

