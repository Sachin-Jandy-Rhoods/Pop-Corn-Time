import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import logo from "../../public/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { Input } from "../Components/UsedInputs";
import { InlineError } from "../Components/Notfications/Error";
import toast from "react-hot-toast";
import { registerAction } from "../Redux/Actions/userActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );

  //validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });
  //onSubmit
  const onSubmit = async (data) => {
    dispatch(registerAction(data))
  };
  //useEffect
  useEffect(()=>{
    if(userInfo?.isAdmin){
      navigate("/dashboard")
    }
    else if(userInfo){
      navigate("/profile")
    }
    if(isSuccess){
     toast.success(`Welcome${userInfo?.fullName}`)
     dispatch({type:"USER_REGISTER_RESET"})
    }
    if(isError){
      toast.error(isError)
      dispatch({type:"USER_REGISTER_RESET"})
    }
  },[userInfo,isSuccess,isError, navigate, dispatch])

  return (

    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
      <form
          onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:3/5 bg-dry rounded-lg border border-border">
          <img src={logo} alt="logo" className="w-1/4 h-16 object-cover" />
          <div className="w-full">
            <Input
              label="FullName"
              placeholder="Netflixo React tailwind"
              type="text"
              name="fullName"
              register={register("fullName")}
            />
            {errors.fullName && <InlineError text={errors.fullName.message} />}
          </div>
      
          <div className="w-full">
            <Input
              label="Email"
              placeholder="popcorntime@gmail.com"
              type="email"
              name="email"
              register={register("email")}
              bg={true}
            />
            {errors.email && <InlineError text={errors.email.message} />}
          </div>
          <div className="w-full">
            <Input
              label="password"
              placeholder="popcorntime@gmail.com"
              type="password"
              name="password"
              register={register("password")}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <Input
            label="password"
            placeholder="******"
            type="password"
            bg={true}
          />
          <button
          type="submit"
           disabled={isLoading} className="bg-subMain transition hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
          {
              //if loading show loading
              isLoading?(
                "Loading..."
              ):(
                <>
                  <FiLogIn /> Sign In
                </>
              )
            }
          
          </button>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
           Sign In </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;