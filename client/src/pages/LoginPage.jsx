import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const {loading, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials(prev => ({...prev, [event.target.id]: event.target.value}))
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            navigate("/")
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }

    return (
        <div className="bg-primary p-28 gap-2 flex items-center justify-center w-3/5 h-2/5 mt-20 mx-80  rounded-full">
            <div className="flex flex-col w-2/5 h-2/5 mt-12">
            <h1 className="primary text-white text-center mb-2">Login</h1>
                <input type="text" placeholder="username" id="username" onChange={handleChange} />
                <input type="password" placeholder="password" id="password" onChange={handleChange} />
                <button disabled={loading} onClick={handleLogin} className="primary">Login</button>
                {error && <span className="text-white font-bold">{error.message}</span>}
            </div>
        </div>
    )
}