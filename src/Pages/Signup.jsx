import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate, NavLink } from "react-router";
import GoogleLogin from "../Components/GoogleLogin";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Signup = () => {
  const { user, signUpUser, signOutUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  if (user) {
    return navigate("/");
  }

  const signUpHandle = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;


    signUpUser(email, password)
    .then((result) => {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      })
      .then((res) => {
        const userInfo = {
          name: name,
          email:email,
          photoURL: photoUrl,
          role: "member",
        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Sign Up Successfully",
                icon: "success",
                confirmButtonText: "Okay",
              });
              e.target.reset();
              signOutUser();
              navigate(from, { replace: true });
            }
          })
          .catch((e) => {
            
            Swal.fire({
              title: "Error!",
              text: "Something Wrong in saving user data in database",
              icon: "error",
              confirmButtonText: "Okay",
            });
          });
      })
      .catch((e)=>{

        Swal.fire({
            title: "Error!",
            text: "Something Wrong in updating the profile",
            icon: "error",
            confirmButtonText: "Okay",
          });
      })
    })
    .catch(()=>{
        Swal.fire({
            title: "Error!",
            text: "Authentication Failed",
            icon: "error",
            confirmButtonText: "Okay",
          });
    })
  };

  return (
    <div className="">
      <div className="absolute top-0 left-0">
        <NavLink to={"/"}>
          <h1 className="ml-5 mt-5 text-xl font-bold">Task Tracker</h1>
        </NavLink>
      </div>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className=" ">
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="w-full max-w-lg p-6 space-y-5 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sign in to Task Tracker
                </h2>
                <form
                  onSubmit={signUpHandle}
                  className="mt-8 space-y-6 border-dashed border-gray-400 border-b-2 pb-5"
                  action="#"
                >
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Photo URL
                    </label>
                    <input
                      type="text"
                      name="photoUrl"
                      id="photoUrl"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="www.photoUrl.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="min-w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign Up to your account
                  </button>
                </form>
                <GoogleLogin></GoogleLogin>
                <div className="text-sm font-medium text-gray-900 dark:text-white flex space-y-2">
                  Allready a member ?{" "}
                  <NavLink to={"/login"}>
                    <p className="ml-2 text-blue-600 hover:underline dark:text-blue-500">
                      Login
                    </p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
