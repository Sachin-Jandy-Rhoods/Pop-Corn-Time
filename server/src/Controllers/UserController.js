import asyncHandler from "express-async-handler"
import User from "../Models/UserModels.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import { generateToken } from "../middlewares/Auth.js"

// @desc register user
// @route POST /api/Users/
// @access public


const registerUser = asyncHandler(async(req,res)=>{
    const {fullName,email,password,image} = req.body

    try {
        const userExits = await User.findOne({email})
        // check if user exits
        if (userExits) {
            res.status(400)
            throw new Error("User alredy exists")
        }
        //hash password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create user in database
        const user =await User.create({
            fullName,
            email,
            password:hashedPassword,
            image
        })

        //if user created successfully send user data and token to client

        if(user){
            res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                image:user.image,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid user data")
        }

        
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//@desc login user
//@route/POST/api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try{
        //find user in db
        const user = await User.findOne({email});
        //if User exits compare password with hashed password then user data and token to client
        if (user && (await bcrypt.compare(password, user.password))) {
          res.json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            image:  user.image,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),


          }) ;
          //if user not found or  password is incorrect send error message to client

        } else {
            res.status(401);
            throw new Error ("Invalid email or password");

        }
    }catch(error){
        res.status(400).json({message: error.message})
    }

})

//desc Delete user profile
//@route DELETE /api/users/
//@access Private
const deleteUserProfile = asyncHandler(async(req,res)=>{
    try {
        //find User id  in db
        const user = await User.findById(req.user._id);
        //if  user exits delete user from db
        if (user) {
            //if  user exits delete user from db
            if(user.isAdmin){
                res.status(400);
                throw new Error ("Can't delete admin user");

            }
            //else  delete user from db
            await user.remove();
            res.json({message:"User deleted successfully"})

        }
        //else send error  message 
        else{
            res.status(404);
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

export {registerUser, loginUser, deleteUserProfile};