const { categorySchema } = require("../validator/categoryValidator");
const { addCategoryService } = require("../service/category.service");

const addCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ messege: error.details[0].messege });
    }
    const { name, description } = req.body;
    const category = await addCategoryService({ name, description });
    res.status(200).json({ category: category });
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ message: error.message });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json(category);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCategory,
  fetchCategories,
};
