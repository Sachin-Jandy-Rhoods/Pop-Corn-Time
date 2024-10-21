import React from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { CgMenuBoxed } from "react-icons/cg";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const MobileFooter = () => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const { userInfo } = useSelector((state) => state.userLogin);

  const active = "bg-white text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive} ` : `${inActive} text-white`;

  return (
    <>
      <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        {/* Drawer */}
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to={"/favourites"} className={Hover}>
            <div className="relative">
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                {likedMovies?.length > 0 ? likedMovies?.length : 0}
              </div>
              <FiHeart />
            </div>
          </NavLink>
          <NavLink
            to={
              userInfo
                ? userInfo.isAdmin
                  ? "/dashboard"
                  : "/profile"
                : "/login"
            }
            className={Hover}
          >
            <FiUserCheck />
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
