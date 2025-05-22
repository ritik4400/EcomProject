const Category = require("../models/category");

const addCategoryService = async ({ name, description }) => {
  
  const category = await Category.create({
    name,
    description,
  });
  return category;
};

module.exports = {addCategoryService};
