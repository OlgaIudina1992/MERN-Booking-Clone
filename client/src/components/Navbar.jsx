import { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Navbar() {
    
    const {user} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        res = await axios.post("http://localhost:5000/api/auth/logout");
        dispatch({type: "LOGOUT", payload: res.data})
        navigate("/");
        } catch (err) {
        console.log(err);
        }
    };


    return (
        <nav className="flex h-20 w-full justify-between bg-primary text-white">
            <Link to={'/'} className="flex items-center gap-1 ml-2 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                </svg>
                <span className="font-bold text-xl">Barb's Booking</span>                
            </Link>
            
            {user ? (<div className="flex justify-end items-end gap-4">
                <button className="primary">{user.username}</button>
                <button onClick={handleLogout} className="primary mr-4">Logout</button>
            </div>) : (<div className="flex justify-end items-end gap-4">
            <Link to={"/login"}>
                <button className="primary">Login</button>
            </Link>               
                <button className="primary mr-4">Register</button>
            </div>)}
         
        </nav>
    )
}