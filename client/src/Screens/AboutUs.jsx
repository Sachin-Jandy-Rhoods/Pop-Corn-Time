import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import about from "../Assets/about.jpg";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to our Popcorn Time
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Welcome to Popcorn Time, your ultimate destination for an
                  unparalleled movie-watching experience! We bring the latest
                  and greatest films from around the world straight to your
                  screen, offering a wide variety of genres to satisfy every
                  mood. Whether you’re a fan of action-packed blockbusters,
                  heartwarming romances, or indie gems, Popcorn Time has
                  something for everyone. At Popcorn Time, we believe in
                  creating a seamless and enjoyable OTT platform where
                  entertainment is just a click away. Our user-friendly
                  interface, high-quality streaming, and curated movie
                  collections make it easy for you to discover and enjoy your
                  favorite films.
                </p>
                <p>
                  Join us as we redefine movie nights, offering the best titles
                  in the comfort of your home. Stay tuned for regular updates
                  and exclusive releases, because at Popcorn Time, it’s always
                  time for great movies!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold ">10K</span>
                  <h4 className="text-lg font-semibold mp-2">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Enjoy streaming the latest movies and shows in
                    high-definition.{" "}
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold ">8K</span>
                  <h4 className="text-lg font-semibold mp-2">Lovely Users</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Completely free, Without Registration!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src={about}
                alt="about us "
                className="w-full xl:block hidden h-header rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
