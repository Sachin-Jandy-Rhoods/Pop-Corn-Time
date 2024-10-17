import Axios from "./Axios.jsx";

//register new user API call
const registerService=async(user)=>{
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
    const {data}=await Axios.post("/users/login",user);
    if(data){
        localStorage.setItem("userInfo",JSON.stringify(data));
    }
    return data;
}

//  update profile APi call
const updateProfileService = async (user, token) => {
    const {data} = await Axios.put("/user", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (data) {
     localStorage.setItem("userInfo" , JSON.stringify(data));
    }
    return data
       
    
}

export {registerService,logoutService,loginServices,updateProfileService}