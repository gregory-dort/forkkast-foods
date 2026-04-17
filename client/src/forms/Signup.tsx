import axios from 'axios';
import { useState } from 'react';
import { usersApi } from '../apis/api';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await usersApi.post('/signup', { email, password, username: name });

            setMessage(response.data.message);
            setEmail('');
            setName('');
            setPassword('');

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'An error occurred during sign up. Please try again.');
            } else {
                setError('Unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className=''>
            <h2 className='text-3xl font-serif font-bold mb-8 text-center text-warm-brown'>
                Create an Account
            </h2>
            {/* Form */}
            <form onSubmit={handleSubmit} className = ''>
                <label htmlFor="name" className='block text-sm font-medium text-warm-brown mb-1'>
                    Enter your Name
                </label>
                <input
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='rounded-md border bg-cream px-4 py-2 w-full mb-4 focus:outline-none'
                />
                <label htmlFor="email" className='block text-sm font-medium text-warm-brown mb-1'>
                    Enter your Email
                </label>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='rounded-md border bg-cream px-4 py-2 w-full mb-4 focus:outline-none'
                />
                <label htmlFor="password" className='block text-sm font-medium text-warm-brown mb-1'>
                    Create your Password
                </label>
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='rounded-md border bg-cream px-4 py-2 w-full mb-4 focus:outline-none'
                />
                <button
                    type='submit'
                    className='bg-forest-green hover:bg-deep-green rounded-full text-warm-brown'
                >
                    Sign Up
                </button>
            </form>
            {/* Display success / error message */}
            {message && <div className = ''>{message}</div>}
            {error && <div className = ''>{error}</div>}
        </div>
    );
};

export default SignUpForm;