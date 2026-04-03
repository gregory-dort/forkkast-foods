import { useState } from 'react';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // send POST request to API
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, password, username })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEmail('');
                setUsername('');
                setPassword('');
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error('Network or server-side error: ', err);
            setError('Unexpected error occurred. Please try again later');
        }
    };

    return (
        <div className = "">
            <div className = "">
                <h2 className = "">Create an Account</h2>
                {/* Display success / error message */}
                {message && <div className = "">{message}</div>}
                {error && <div className = "">{error}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} className = "">

                </form>
            </div>
        </div>
    );
};

export default SignUpForm;