import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import NotFound from "./Screens/NotFound";
import Profile from "./Screens/Dashboard/Admin/Profile";
import AOS from "aos"; // Make sure 'AOS' is correctly imported with uppercase 'O'
import "aos/dist/aos.css";
import Password from "./Screens/Dashboard/Admin/Password";
import FavouritesMovies from "./Screens/Dashboard/Admin/FavouritesMovies";
import MovieList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import ContactUs from "./Screens/ContactUs";
import Login from "./Screens/Login";
import MoviesPage from "./Screens/Movies";
import SingleMovie from "./Screens/SingleMovie";
import Register from "./Screens/Register";
import Users from "./Screens/Dashboard/Admin/Users";
import WatchPage from "./Screens/WatchPage";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/password" element={<Password />} />
      <Route path="/favourites" element={<FavouritesMovies />} />
      <Route path="/movieslist" element={<MovieList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
