import Axios from "./Axios";

//register new user API call
const resgisterService=async(user)=>{
    const {data}=await Axios.post("/users",user);
    if(data){
        localStorage.setItem("userInfo",JSON.stringify(data));
    }
    return data;
}

//logout user Function
const logoutService=()=>{
    localStorage.removeItem("userInfo");
    return null
}

//login user
const loginServices=async(user)=>{
    const {data}=await Axios.post("/user/login",user);
    if(data){
        localStorage.setItem("userInfo",JSON.stringify(data));
    }
    return data;
}