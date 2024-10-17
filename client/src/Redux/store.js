import {combineReducers,configureStore} from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers"
// import { userInfo } from "os";

const rootReducers=combineReducers({
    //user reducer
    userLogin:User.userLoginReducer,
    userRegister:User.userRegisterReducer,
    UserUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,    UserchangePassword: User.userChangePasswordReducer

})
// get userInfo from  local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


// initialState
const initialState={
    userLogin:{userInfo:userInfoFromStorage},
};

export const store=configureStore({
    reducer:rootReducers,
    preloadedState:initialState,
})

