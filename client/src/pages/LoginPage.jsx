import {Link} from 'react-router-dom';
import { useState } from 'react';

async function handleLoginSubmit(event) {
    event.preventDefault();

    try {
        await axios.post('/login', {email, password})
        alert("Login successful")
    } catch (e) {
        alert("Login failed")
    }
    
}

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center p-2 mb-4">Login</h1>
                <form className="max-w-md mx-auto border" onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="your email here" 
                    value={email} 
                    onChange={event => setEmail(event.target.value)} />
                    <input type="password" placeholder="your password here" 
                    value={password} 
                    onChange={event => setPassword(event.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account?                        
                        <Link className='underline text-black' to={'/register'}> Click here to register!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}