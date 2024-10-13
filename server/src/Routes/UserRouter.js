import express from "express"
import { deleteUserProfile, loginUser, registerUser } from "../Controllers/UserController.js";


const router = express.Router();

// PUBLIC ROUTES

router.post("/", registerUser);
router.post("/login", loginUser);

// Private routes
 router.delete("/",protect,deleteUserProfile)



export default router