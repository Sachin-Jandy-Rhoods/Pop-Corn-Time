import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { Input } from "../Components/UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../Components/Notfications/Error";
import { loginAction } from "../Redux/Actions/userActions";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );

  //validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });
  //onSubmit
  const onSubmit = async (data) => {
    dispatch(loginAction(data));
  };
  //useEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome back ${userInfo?.fullName}`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:3/5 bg-dry rounded-lg border border-border"
        >
          <img src={logo} alt="logo" className="w-1/4 h-16 object-cover" />
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
              placeholder="******"
              type="password"
              bg={true}
              name="password"
              register={register("password")}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transition hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              //if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <FiLogIn /> Sign In
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Don't have an account?{" "}
            <Link to="/register" className="text-dryGray font-semibold ml-2">
              Sign Up{" "}
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
