import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

export const AuthContext = createContext(null);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInUserWithGoogle =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }
    
    const signOutUser = () => {
        return signOut(auth);
    }

    const authInfo ={
        user,
        loading,
        signUpUser,
        signInUser,
        signInUserWithGoogle,
        signOutUser,
    }
    useEffect(()=>{

        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })

        return()=>{
            unSubscribe();
        } 

    },[])

    return (
        <AuthContext.Provider value = {authInfo}> {children}</AuthContext.Provider>
    );
};

export default AuthProvider;