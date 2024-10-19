import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import { Empty } from "../Notfications/Empty";
import Loader from "../Notfications/Loader";

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={
                movie?.titleImage
                  ? `../../../public/images/${movie.titleImage}`
                  : "/images/user.png"
              }
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const TopRated = ({ movies, isLoading }) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);

  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";

  useEffect(() => {
    // Ensure the buttons are available before Swiper is initialized
    if (nextEl && prevEl) {
      // Reinitialize Swiper if necessary (optional)
    }
  }, [nextEl, prevEl]);

  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
            <div className="w-full px-1 flex-rows gap-6 pt-12">
              <button className={classNames} ref={(node) => setPrevEl(node)}>
                <BsCaretLeftFill />
              </button>
              <button className={classNames} ref={(node) => setNextEl(node)}>
                <BsCaretRightFill />
              </button>
            </div>
          </>
        ) : (
          <Empty message="It seems like we don't have any movie" />
        )}
      </div>
    </div>
  );
};

export default TopRated;
