import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Tab = 'name' | 'email' | 'password' | 'delete';

const AccountSettingsForm = () => {
    const { user, updateName, updateEmail, updatePassword, deleteAccount } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>('name');

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reset = () => { setMessage(''); setError(''); };

    const handleUpdateName = async (e: React.FormEvent) => {
        e.preventDefault();
        reset();
        if (name.trim() === '') return setError('Name cannot be blank.');
        setIsSubmitting(true);
        try {
            await updateName(name);
            setMessage('Name updated successfully.');
        } catch {
            setError('Failed to update name. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        reset();
        setIsSubmitting(true);
        try {
            await updateEmail(email);
            setMessage('Confirmation sent to your new email address.');
        } catch {
            setError('Failed to update email. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        reset();
        if (password !== confirmPassword) return setError('Passwords do not match.');
        if (!passwordRegex.test(password)) return setError('Password must be at least 8 characters with an uppercase letter, lowercase letter, and symbol.');
        setIsSubmitting(true);
        try {
            await updatePassword(password);
            setMessage('Password updated successfully.');
            setPassword('');
            setConfirmPassword('');
        } catch {
            setError('Failed to update password. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAccount = async () => {
        reset();
        setIsSubmitting(true);
        try {
            await deleteAccount();
            navigate('/');
        } catch {
            setError('Failed to delete account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs: { key: Tab; label: string }[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'password', label: 'Password' },
        { key: 'delete', label: 'Delete Account' },
    ];

    const inputClass = 'rounded-md border bg-cream px-4 py-2 w-full mb-4 focus:outline-none';
    const btnClass = 'bg-emerald-green hover:bg-deep-green rounded-full text-warm-brown p-2 w-full disabled:opacity-50';
    const labelClass = 'block text-sm font-medium text-warm-brown mb-1';

    return (
        <div className='font-serif text-warm-brown min-w-80'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Account Settings</h2>

            {/* Tabs */}
            <div className='flex border-b border-warm-brown mb-6'>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => { setActiveTab(tab.key); reset(); }}
                        className={`flex-1 py-2 text-sm font-medium transition-colors ${
                            activeTab === tab.key
                                ? 'border-b-2 border-warm-brown text-warm-brown'
                                : 'text-warm-brown opacity-50 hover:opacity-75'
                        } ${tab.key === 'delete' ? 'text-red-500' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Name Tab */}
            {activeTab === 'name' && (
                <form onSubmit={handleUpdateName}>
                    <label className={labelClass}>Update Account Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className={inputClass}
                        placeholder='Enter new name'
                    />
                    <button type='submit' disabled={isSubmitting} className={btnClass}>
                        {isSubmitting ? 'Updating...' : 'Update Name'}
                    </button>
                </form>
            )}

            {/* Email Tab */}
            {activeTab === 'email' && (
                <form onSubmit={handleUpdateEmail}>
                    <label className={labelClass}>Update Account Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className={inputClass}
                        placeholder='Enter new email'
                    />
                    <button type='submit' disabled={isSubmitting} className={btnClass}>
                        {isSubmitting ? 'Updating...' : 'Update Email'}
                    </button>
                </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
                <form onSubmit={handleUpdatePassword}>
                    <label className={labelClass}>New Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className={inputClass}
                        placeholder='Enter new password'
                    />
                    <label className={labelClass}>Confirm Password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className={inputClass}
                        placeholder='Confirm new password'
                    />
                    <button type='submit' disabled={isSubmitting} className={btnClass}>
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            )}

            {/* Delete Tab */}
            {activeTab === 'delete' && (
                <div className='flex flex-col items-center text-center gap-4'>
                    <p className='text-red-500 font-medium'>This action is permanent and cannot be undone.</p>
                    <p>All your data including recipes and profile information will be deleted.</p>
                    <button
                        onClick={handleDeleteAccount}
                        disabled={isSubmitting}
                        className='bg-red-500 hover:bg-red-700 rounded-full text-white p-2 w-full disabled:opacity-50'
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete My Account'}
                    </button>
                </div>
            )}

            {/* Feedback */}
            {message && <p className='mt-4 text-center text-emerald-green'>{message}</p>}
            {error && <p className='mt-4 text-center text-red-500'>{error}</p>}
        </div>
    );
};

export default AccountSettingsForm;