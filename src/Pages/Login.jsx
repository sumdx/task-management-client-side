import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../Components/GoogleLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { user, signInUser, signInUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  if (user) {
    return navigate("/");
  }
  const loginHandle = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then((res) => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Something Wrong in authentication",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0">
        <NavLink to={"/"}>
          <h1 className="ml-5 mt-5 text-xl font-bold">Task Tracker</h1>
        </NavLink>
      </div>
      <div>
        <section class="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div class=" ">
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="w-full max-w-lg p-6 space-y-5 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Sign in to Task Tracker
                </h2>
                <form
                  onSubmit={loginHandle}
                  class="mt-8 space-y-6 border-dashed border-gray-400 border-b-2 pb-5"
                  action="#"
                >
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="min-w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign Up to your account
                  </button>
                </form>
                <GoogleLogin></GoogleLogin>
                <div class="text-sm font-medium text-gray-900 dark:text-white flex space-y-2">
                  Not a member ?{" "}
                  <NavLink to={"/signup"}>
                    <p class="ml-2 text-blue-600 hover:underline dark:text-blue-500">
                      Sign Up
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

export default Login;
