import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const LogOutBtn = () => {
    const {signOutUser} = useContext(AuthContext);
    const logOutHandle = () =>{
        signOutUser();
    }
    return (
        <button onClick={logOutHandle} className='w-full px-5 py-3 flex items-center gap-2 text-base font-medium justify-center rounded-xl text-center text-blue-700 border border-blue-700 focus:ring-4 focus:ring-blue-300  hover:bg-blue-800 hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-blue-800'>
            Log Out
        </button>
    );
};

export default LogOutBtn;