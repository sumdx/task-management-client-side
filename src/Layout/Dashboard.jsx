import { useContext } from "react";
import { FaSignOutAlt, FaTasks } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const {signOutUser} = useContext(AuthContext);
  
  const navigate = useNavigate();

  const logout = () => {
    signOutUser()
    .then(()=>{

      navigate("/");
    })
    
  };
  const menuItems = (
    <>
      <li>
        <NavLink
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          to={"all-tasks"}
        >
          <FaTasks size={30} />
          <p className="flex-1 ms-5 whitespace-nowrap text-xl">All Tasks</p>
        </NavLink>
      </li>
      
      <li>
        <NavLink
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          to={"/"}
        >
          <IoMdHome size={30} />
          <p className="flex-1 ms-5 whitespace-nowrap text-xl">Home</p>
        </NavLink>
      </li>
      <li>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          
        >
          <FaSignOutAlt size={30} />
          <p onClick={logout} className="flex-1 ms-5 whitespace-nowrap text-xl">Log Out</p>
        </div>
      </li>
    </>
  );
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl ml-2 font-bold dark:text-white">Dashboard</p>
          <ul className="space-y-2 font-medium mt-4">{menuItems}</ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 dark:bg-gray-700 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
