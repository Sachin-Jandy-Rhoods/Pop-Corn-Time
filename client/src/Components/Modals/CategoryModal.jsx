import React, { useEffect, useState } from "react";
import MainModal from "./MainModal.jsx";
import { Input } from "../UsedInputs.jsx";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction, updateCategoryAction } from "../../Redux/Actions/CategoriesActions.jsx";
import toast from "react-hot-toast";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const[title,setTitle]=useState("")
  const dispatch=useDispatch()

  const {isLoading,isError,isSuccess}=useSelector((state)=>state.categoryCreate)
  const {isLoading:upLoading,isError:upError,isSuccess:upSuccess}=useSelector((state)=>state.categoryUpdate)


  // category handler
   const submitHandler=(e)=>{
    console.log("hello");
    
    e.preventDefault() 
    if(title){
      //if category is not empty then update category else create category
      if(category){
        dispatch(updateCategoryAction(category?._id,{title:title}))
        setModalOpen(!modalOpen)
      }
      else{
        dispatch(createCategoryAction({title:title}))
        setTitle("")
      }
    }
    else{
      toast.error("Please write a category name")
    }
   }

   //useEffect.[]
   useEffect(()=>{
    if(upError || isError){
      toast.error(upError || isError)
      dispatch({
        type:isError?"CREATE_CATEGORY_RESET":"UPDATE_CATEGORY_RESET"
      })
    }
    //Sucess
   if(isSuccess||upSuccess){
    dispatch({
      type:isError?"CREATE_CATEGORY_RESET":"UPDATE_CATEGORY_RESET"
    })
   }

   // if category is not null then set tittle to category  title
   if(category){
    setTitle(category?.title)
   }

   //if modal is closed the set  tittle to empty
   if(modalOpen== false){
    setTitle("")
   }
   },[dispatch,isError,isSuccess,upError,upSuccess,category,modalOpen])

  
  return (
    <>
    
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block  border border-border text-center lg:w-full w-full allign-middle p-5  h-full bg-main text-white rounded-xl ">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6" onSubmit={submitHandler}>
          <Input
            label="Category Name"
            placeholder={"Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
          />
          <button
           type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {
              isLoading || upLoading?"Loading......": category? "Update" : "Create"
            }
          </button>
        </form>
      </div>
    </MainModal>
    <form onSubmit={submitHandler}>
      <button type="submit">
            hi
      </button>
    </form>
    </>
    
  );
};

export default CategoryModal;
