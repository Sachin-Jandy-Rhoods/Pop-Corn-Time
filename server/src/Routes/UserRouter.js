import express from "express";
import {
  changeUserPassword,
  deleteUser,
  deleteUserProfile,
  getLikedMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController.js";
import { protect,admin} from "../middlewares/Auth.js";

const router = express.Router();

// PUBLIC ROUTES

router.post("/", registerUser);
router.post("/login", loginUser);

// Private routes
router.delete("/", protect, deleteUserProfile);
router.put("/", protect, updateUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);

//Admin Routes

router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
