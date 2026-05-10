import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type SignInFormProps = {
    onSuccess: () => void;
}

const SignInForm = ({ onSuccess }: SignInFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { signIn } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await signIn(email, password);
            onSuccess();
            navigate('/home')
        } catch (err) {
            console.error('Error signing in: ', err);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className=''>
            <h2 className='text-3xl font-serif font-bold mb-8 text-center text-warm-brown'>
                Sign into your Account
            </h2>
            {/* Form */}
            <form onSubmit={handleSubmit} className = ''>
                <label htmlFor='email' className='block text-sm font-medium text-warm-brown mb-1'>
                    Email
                </label>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='rounded-md border-tan bg-cream px-4 py-2 w-full mb-4 focus:outline-none'
                />
                <label htmlFor='password' className='block text-sm font-medium text-warm-brown mb-1'>
                    Password
                </label>
                <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='rounded-md border-tan bg-cream px-4 py-2 w-full mb-4 focus:outline-none'
                />
                <button
                    type='submit'
                    className='bg-emerald-green hover:bg-deep-green rounded-full text-warm-brown p-2'
                >
                    Sign In
                </button>
            </form>
            {/* Display success / error message */}
            {message && <div className=''>{message}</div>}
            {error && <div className=''>{error}</div>}
        </div>
    );
};

export default SignInForm;