import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const GoogleLogin = () => {
  const { user, signInUserWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/all-tasks";
  
  const googleSignInHandle = () => {
    signInUserWithGoogle()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user?.email,
          photoURL: res.user?.photoURL,
          role: "member",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate(from, { replace: true });
        })
        .catch((err) =>{
          Swal.fire({
            title: "Error!",
            text: "Something Wrong in saving user data in database",
            icon: "error",
            confirmButtonText: "Okay",
          });
        })
        ;
      })
      .catch((err) => {

        Swal.fire({
          title: "Error!",
          text: "Something Wrong in saving user data in database",
          icon: "error",
          confirmButtonText: "Okay",
        });
            
      });
  };

  return (
    <button
      onClick={googleSignInHandle}
      className="w-full px-5 py-3 flex items-center gap-2 text-base font-medium justify-center rounded-xl text-center text-blue-700 border border-blue-700 focus:ring-4 focus:ring-blue-300  hover:bg-blue-800 hover:text-white"
    >
      <FaGoogle></FaGoogle>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
