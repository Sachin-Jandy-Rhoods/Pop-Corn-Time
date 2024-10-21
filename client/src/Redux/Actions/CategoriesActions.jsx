import * as CategoriesConstants from "../Constants/CategoriesConstant";
import * as CategoriesAPIs from "../APIs/CategoriesService";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

//Get all Categories action

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
    const data = await CategoriesAPIs.getCategoriesService();
    dispatch({
      type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
  }
};

// create category action

export const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_REQUEST });
        await CategoriesAPIs.createCategoryService(title, tokenProtection(getState));
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_SUCCESS });
        toast.success("Category created successfully");
        dispatch(getAllCategoriesAction())
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};


//UPDATE CATEGORY ACTION
export const updateCategoryAction =
  (id, title) => async (dispatch, getState) => {
    try {
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_REQUEST });
      await CategoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS });
      toast.success("Category updated Succesfully");
      dispatch(getAllCategoriesAction())
    } catch (error) {
      ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORY_FAIL);
    }
  };

//Delete Category Action
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoriesConstants.DELETE_CATEGORY_REQUEST });
    await CategoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispatch({ type: CategoriesConstants.DELETE_CATEGORY_SUCCESS });
    toast.success("Category deleted Succesfully");
    dispatch(getAllCategoriesAction()) 
  } catch (error) {
    ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORY_FAIL);
  }
};
