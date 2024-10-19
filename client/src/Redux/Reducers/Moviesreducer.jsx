
import *  as moviesConstants from "../Constants/MoviesConstants";

// GET ALL MOVIES
export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case moviesConstants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
// export random movies

export const moviesRandomReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_RANDOM_REQUEST:
            return { isLoading: true };
        case moviesConstants.MOVIES_RANDOM_SUCCESS:
            return { isLoading: false, movies: action.payload };
        case moviesConstants.MOVIES_RANDOM_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
};


// Get Movie By Id

export const movieDetailsReducer = ( state = { movies: {}}, action) =>{
    switch (action.type) {
        case moviesConstants.MOVIES_DETAILS_REQUEST:
            return { isLoading: true };
        case moviesConstants.MOVIES_DETAILS_SUCCESS:
            return { isLoading: false, movies: action.payload};
        case moviesConstants.MOVIES_DETAILS_FAIL:
            return {isLoading: false,isError: action.payload};
        case moviesConstants.MOVIES_DETAILS_RESET:
            return { movie: {}};
        default:
            return state;
        

    }
}

//  Get Top Rated Movies

export const movieTopRatedReducer = (state = {movies: [] },action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_TOP_RATED_REQUEST:
            return { isLoading: true };
        case moviesConstants.MOVIES_TOP_RATED_SUCCESS:
            return { isLoading: false, movies: action.payload};
        case moviesConstants.MOVIES_TOP_RATED_FAIL:
            return {isLoading: false,isError: action.payload};
        
        default:
            return state;
        

    }
}

