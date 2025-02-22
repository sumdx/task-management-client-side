import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if(user){
        return children;
    }
    if(loading){
        return <h1>Loading</h1>
    }
    return (
        <Navigate to={"/login"}></Navigate>
    );
};

export default PrivateRoute;