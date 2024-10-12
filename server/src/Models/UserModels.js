import mongoose from "mongoose"

const UserSchema =mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"please add fullname"],
    },
    email:{
        type:String,
        required:[true,"please add email"],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"please add a password"],
        minlength:[6,"password must be atleast 6 characters"],
    },
    Image:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        
    },
    likedMovies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Movie",
        }
    ],

},
{
    timestamps:true
}
)

export default mongoose.model("user",UserSchema)