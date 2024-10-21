import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { generateToken } from "../middlewares/Auth.js";

// @desc register user
// @route POST /api/Users/
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;

  try {
    const userExits = await User.findOne({ email });
    // check if user exits
    if (userExits) {
      res.status(400);
      throw new Error("User alredy exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user in database
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    //if user created successfully send user data and token to client

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user in db
    const user = await User.findOne({ email });
    //if User exits compare password with hashed password then user data and token to client
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      //if user not found or  password is incorrect send error message to client
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ********* PRIVATE CONTROLLERS *********

// @desc Ubdate user profile
// @route PUT /api/users/profile
// @acces private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    //  if user exists update user data and save it in DB

    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updateUser = await user.save();
      // send update user data and token to client
      res.json({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        email: updateUser.email,
        image: updateUser.image,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    }
    // else send error message
    else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//desc Delete user profile
//@route DELETE /api/users/
//@access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    //find User id  in db
    const user = await User.findById(req.user._id);
    //if  user exits delete user from db
    if (user) {
      //if  user exits delete user from db
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      //else  delete user from db
      await User.deleteOne({ _id: req.user._id });
      res.json({ message: "User deleted successfully" });
    }
    //else send error  message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// @desc Change user Password
// @route PUT /api/users/password
// @access Private

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    //find user in DB
    const user = await User.findById(req.user._id);
    //if user exists  compare old password with hased password then update user password and save it in DB
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      //hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      //update user password in DB
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password updated !!" });
    }
    // else send  error  message to client
    else {
      res.status(401);
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all liked movies
// @route GET /api/users/favorites
// @access Private

const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // fing user in db
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exists send liked movies to client
    if (user) {
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Add movie to liked movies
// @route POST /api/users/favorites
// @access private

const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find usre in db
    const user = await User.findById(req.user._id);
    // if user exists add movie to liked movies and save it in db
    if (user) {
      // check if movie already liked
      // IF movie already liked send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie alreay liked");
      }
      // else add movie to liked movies and save it in DB
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete all liked movies
// @desc DELETE /api/users/favorites
// @access Private

const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete all liked movies and save it in DB
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "Your favorite movies deleted Successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/// ******* Admin controllers

//@desc Get All users
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  try {
    //find  all users in db
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//desc delete user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  try {
    //find user in db
    const user = await User.findById(req.params.id);
    //if user exits delete user from db
    if (user) {
      //if user is the admin throw the error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      //else delete user from db
      await user.deleteOne();
      res.json({ message: "User delete successfully" });
    }
    //else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovies,
  getUsers,
  deleteUser,
};
