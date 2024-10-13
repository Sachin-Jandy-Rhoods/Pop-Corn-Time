import express from "express"
import { deleteUserProfile, loginUser, registerUser, updateUserProfile } from "../Controllers/UserController.js";
import { protect } from "../middlewares/Auth.js";


const router = express.Router();

// PUBLIC ROUTES

router.post("/", registerUser);
router.post("/login", loginUser);

// Private routes
 router.delete("/",protect,deleteUserProfile)



// ***** PRIVATE ROUTES *****
router.put("/", protect,updateUserProfile )

export default router