import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as movies from "./Reducers/Moviesreducer";
import * as categories from "./Reducers/CategoriesReducer";

const rootReducers = combineReducers({
  //user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  UserUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  UserchangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUserReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,
  // Category reducers
  categoryGetAll: categories.getAllCategoriesReducer,
  categoryCreate: categories.createCategoryReducer,
  categoryUpdate: categories.updateCategoryReducer,
  categoryDelete: categories.deleteCategoryReducer,

  //Movies reducers
  getAllMovies: movies.moviesListReducer,
  getRandomMovies: movies.moviesRandomReducer,
  getMovieById: movies.movieDetailsReducer,
  getTopRatedMovie: movies.movieTopRatedReducer,
  createReview: movies.createReviewReducer,
  createMovie: movies.createMovieReducer,
  casts: movies.CastsReducer,
  deleteMovie: movies.deleteMovieReducer,
  deleteAllMovies: movies.deleteAllMoviesReducer,
  updateMovie: movies.updateMovieReducer,
});

// get userInfo from  local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducers,
  preloadedState: initialState,
});
