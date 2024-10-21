import React from "react";
import head from "../Assets/head.jpg";

const Head = ({ title }) => {
  return (
    <div className="w-full bg-deepGray lg:h-64 relative overflow-hidden rounded-md">
      <img src={head} alt="aboutus" className="w-full h-full object-cover " />
      {/* see here */}
      <div className="absolute lg:top-24 top-0 bottom-0 left-0 right-0 w-full flex-colo">
        <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
