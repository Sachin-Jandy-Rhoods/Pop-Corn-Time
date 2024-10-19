import * as moviesConstants from "../Constants/MoviesConstants";
import * as moviesAPIs from "../APIs/MoviesServices"
import toast from "react-hot-toast"
import { ErrorsAction, tokenProtection } from "../Protection"

// get all movies action
export const getAllMoviesAction = ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
}) => async ( dispatch ) => {
    try {
        dispatch({type:moviesConstants.MOVIES_LIST_REQUEST})
        const response =  await moviesAPIs.getAllMoviesService(
            category,
            time,
            language,
            rate,
            year,
            search,
            pageNumber,
        )
        dispatch({type:moviesConstants.MOVIES_LIST_SUCCESS,
            payload:response
        })
    } catch (error) {
        ErrorsAction( error, dispatch, moviesConstants.MOVIES_LIST_FAIL )
    }
}
// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
        const response = await moviesAPIs.fetchRandomMovies();
        dispatch({
            type: moviesConstants.MOVIES_RANDOM_SUCCESS,
            payload: response,
        });
    } catch (error) {
        console.error('Error fetching random movies:', error);
        ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
    }
};


//  GET MOVIE BY ID ACTION
export const getMovieByIdAction = (id) => async (dispatch) => {
    try{
     dispatch({ type: moviesConstants.MOVIES_DETAILS_REQUEST });
     const response = await moviesAPIs.getMovieByIdService(id);
     dispatch({
         type: moviesConstants.MOVIES_DETAILS_SUCCESS,
         payload: response,
     });
    } catch (error) {
     ErrorsAction ( error, dispatch, moviesConstants.MOVIES_DETAILS_FAIL);
    }
 }

//  GET TOP RATED MOVIE ACTION 

export const getTopRatedMovieAction = () => async (dispatch) => {
    try{
     dispatch({ type: moviesConstants.MOVIES_TOP_RATED_REQUEST });
     const response = await moviesAPIs.getTopRatedMovieService();
     dispatch({
         type: moviesConstants.MOVIES_TOP_RATED_SUCCESS,
         payload: response,
     });
    } catch (error) {
     ErrorsAction ( error, dispatch, moviesConstants.MOVIES_TOP_RATED_FAIL);
    }
 };
