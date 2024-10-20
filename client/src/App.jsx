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
import AddMovie from "./Screens/Dashboard/Admin/AddMovie";
import ScrollOnTop from "./ScrollOnTop";
import ToasContainer from "./Components/Notfications/ToasContainer";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesActions";
import { getAllMoviesAction } from "./Redux/Actions/MoviesActions";

const App = () => {
    AOS.init();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllCategoriesAction());
      dispatch(getAllMoviesAction({}))
    }, [dispatch]);

  return (
    <>
      <ToasContainer />
      <ScrollOnTop>
        <Routes>
          {/* PUBLIC ROUTERS */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:search" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          {/* PRIVATE PUBLIC ROUTERS */}
          <Route element={<ProtectedRouter />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/favourites" element={<FavouritesMovies />} />

            {/* ADMIN ROUTERS */}
            <Route element={<AdminProtectedRouter />}>
              <Route path="/movieslist" element={<MovieList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/addmovie" element={<AddMovie />} />
            </Route>
          </Route>
        </Routes>
      </ScrollOnTop>
    </>
  );
};

export default App;
