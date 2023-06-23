import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event) {
        event.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration successful!')            
        } catch (e) {
            alert('Registration failed. Change parameters and try again.')
        }


        
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center p-2 mb-4">Register</h1>
                <form className="max-w-md mx-auto border" onSubmit={registerUser}>
                    <input type='text' placeholder='full name'
                        value={name} 
                        onChange={event => setName(event.target.value)}/>
                    <input type="email" placeholder="your email" 
                        value={email} 
                        onChange={event => setEmail(event.target.value)}/>
                    <input type="password" placeholder="your password" 
                        value={password} 
                        onChange={event => setPassword(event.target.value)}/>
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account?                        
                        <Link className='underline text-black' to={'/login'}> Log in here!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}