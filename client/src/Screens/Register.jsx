import React from "react";
import Layout from "../Layout/Layout";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { Input } from "../Components/UsedInputs";

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <dir className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:3/5 bg-dry rounded-lg border border-border">
          <img src={logo} alt="logo" className="w-1/4 h-16 object-cover" />
          <Input
            label="Full Name"
            placeholder="Popcorn Time "
            type="text"
            bg={true}
          />
          <Input
            label="Email"
            placeholder="popcorntime@gmail.com"
            type="email"
            bg={true}
          />
          <Input
            label="password"
            placeholder="******"
            type="password"
            bg={true}
          />
          <Link to="/dashboard" className="bg-subMain transition hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
          <FiLogIn /> Sign Up 
          </Link>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
           Sign In </Link>
          </p>
        </dir>
      </div>
    </Layout>
  );
};

export default Register;