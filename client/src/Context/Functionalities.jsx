import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";
import Axios from "../Redux/APIs/Axios";
import { IoMdCloudDownload } from "react-icons/io";

// Check if movie is added to favorites
const IfMovieLiked = (movie, likedMovies) => {
  // Ensure that both likedMovies and movie are valid before finding
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

//like movie functionality
const LikedMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("please login to add favorites")
    : dispatch(
        likeMovieAction({
          movieId: movie._id,
        })
      );
};

// Download Video url functionality

const DownloadVideo = async (videoUrl, setprogress) => {
  const { data } = await Axios({
    url: videoUrl,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (ProgressEvent) => {
      const { loaded, total } = ProgressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setprogress(percent);
      if (percent > 0 && percent < 100) {
        toast.loading(`Downloading... ${percent}%`, {
          id: "download",
          duration: 100000000,
          position: "bottom-right",
          style: {
            background: "#0B0F29",
            color: "#fff",
            borderRadius: "10px",
            border: ".5px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};

export { IfMovieLiked, LikedMovie, DownloadVideo };
