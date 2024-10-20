import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { likeMovieAction } from '../Redux/Actions/userActions';

// Check if movie is added to favorites
  const IfMovieLiked = (movie, likedMovies) => {
    // Ensure that both likedMovies and movie are valid before finding
    return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
  };
  

//like movie functionality
const LikedMovie = (movie,dispatch,userInfo) =>{         
    return !userInfo
    ? toast.error("please login to add favorites")
    :dispatch(
        likeMovieAction({
            movieId : movie._id
        })
    )
};

export {IfMovieLiked,LikedMovie}