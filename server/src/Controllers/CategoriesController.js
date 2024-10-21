import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

// ****** PUBLIC CONTROLLERS *****//
// @desc get all categories
//  @route GET /api/categories
// @access public

const getCategories = asyncHandler(async (req, res) => {
  try {
    //find all categories in database
    const categories = await Categories.find({});
    //sent all  categories to client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// ***ADMIN CONTROLLERS ***///

//@desc create new category
//@route  POST /api/categories
//@access private/Admin

const createCategory = asyncHandler(async (req, res) => {
  try {
    //get title from request body
    const { title } = req.body;
    //carete new category
    const category = new Categories({
      title,
    });
    //save the category in database
    const createdCategory = await category.save();
    //sent the created category to client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc UPDATE category
// @route PUT/ api/categories/:id
// @access private Admin

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      //get category id from request params

      category.title = req.body.title || category.title;
      //save  the update category in database
      const updateCategory = await category.save();
      //send the updated category to client
      res.json(updateCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//@desc delete category
//@desc  DELETE /api/categories/:id
//@access private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // get  category id from request params
    const category = await Categories.findById(req.params.id);
    if (category) {
      // delete the category from database
      await category.deleteOne();
      // send the response to client
      res.json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
