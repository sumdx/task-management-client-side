import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {
    const {user,signInUserWithGoogle} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "dashboard";
    const googleSignInHandle = () => {
        signInUserWithGoogle()
          .then((res) => {

            navigate(from, { replace: true });
            
          })
          .catch((err) => {});
      };

    return (
        <button onClick={googleSignInHandle} className="w-full px-5 py-3 flex items-center gap-2 text-base font-medium justify-center rounded-xl text-center text-blue-700 border border-blue-700 focus:ring-4 focus:ring-blue-300  hover:bg-blue-800 hover:text-white">
                  <FaGoogle></FaGoogle>
                  Sign in with Google
        </button>
    );
};

export default GoogleLogin;