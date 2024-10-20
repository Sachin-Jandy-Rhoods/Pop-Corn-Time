import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from "../../../Redux/Actions/userActions";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";
import toast from "react-hot-toast";

const FavouritesMovies = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  //delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  //delete movies handler
  const deleteMoviesHandler = (id) => {
    window.confirm("Are you sure you want to delete all movies") &&
    dispatch(deleteFavoriteMoviesAction());
  }

  //useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_FAVORITE_MOVIES_RESET" 
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favourite Movies</h2>
          {
            likedMovies?.length > 0 && 
            <button disabled={deleteLoading} onClick={deleteMoviesHandler} className="bg-main border-2 border-subMain font-medium transitions hover:bg-subMain text-white py-3 px-6 rounded">
            {deleteLoading ? "Deleting..." : "Delete All"}
          </button>
          }
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <Empty message="You have no Favorite Movies" />
        )}
      </div>
    </SideBar>
  );
};

export default FavouritesMovies;
