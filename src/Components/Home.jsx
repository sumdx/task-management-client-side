import React from "react";
import banner from "./../assets/Images/banner.svg";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <div className=" dark:bg-gray-800 ">
      <div className="container mx-auto md:flex justify-between min-h-screen items-center">
        <div className="md:w-1/2 mb-10 text-center md:text-left">
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Task Tracker
          </h1>
          <p class="mb-6 md:text-left text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <NavLink
            to={"/dashboard"}

            >
            <button
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
            Get Started
            </button>
           
            
          </NavLink>
        </div>
        <div className="md:w-1/2 h-full flex justify-center items-center">
          <img className="h-1/2 w-1/2" src={banner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
