import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { SignInForm, SignUpForm, AccountSettingsForm } from '../forms';
import Modal from './Modal';
import { useNavigate } from 'react-router';

type SideNavbarProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const SideNavbar = ({ isOpen, setIsOpen }: SideNavbarProps) => {
    const { user, isAuthenticated, signOut, isLoading } = useAuth();
    const navigate = useNavigate();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [modalContent, setModalContent] = useState<'signin' | 'signup'>('signin');

    const [showAccountModal, setShowAccountModal] = useState(false);

    const handleAuthModal = (content: 'signin' | 'signup') => {
        setModalContent(content);
        setShowAuthModal(true);
    };

    const handleAccountModal = () => {
        setShowAccountModal(true);
    }

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error('Error signing out: ', err);
        }
    }

    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isLoading) return null;

    return (
        <div ref={sidebarRef} className={`fixed left-0 h-screen shadow-md p-2 z-50 bg-mint overflow-hidden transition-all duration-500 ${isOpen ? 'w-64' : 'w-14'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className='self-end bg-emerald-green hover:bg-deep-green rounded-full px-3 py-2 text-warm-brown'
            >
                {isOpen ? '←' : '→'}
            </button>

            <div className={`transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className = 'flex flex-col w-full mt-8 items-center justify-center'>
                    {isAuthenticated ? (
                        <div className='flex flex-col text-warm-brown items-stretch'>
                            <p className='font-bold underline underline-offset-4 decoration-2 mb-4'>{user?.name}</p>
                            <button onClick={handleAccountModal} className='bg-emerald-green hover:bg-deep-green rounded-lg p-2 mb-8'>Account Settings</button>
                            <button onClick={handleSignOut} className='bg-emerald-green hover:bg-deep-green rounded-lg p-2 mb-8'>Sign Out</button>
                            <button onClick={() => navigate('/meals')} className='bg-emerald-green hover:bg-deep-green rounded-lg p-2 mb-8'>My Meals</button>
                        </div>
                ) : (
                    <div className='flex flex-col mt-40 text-warm-brown items-stretch'>
                        <h3 className='text-md'>Returning User? Sign In Here!</h3>
                        <button onClick={() => handleAuthModal('signin')} className='bg-emerald-green hover:bg-deep-green rounded-lg p-2 mb-8'>Sign In</button>
                        <h3 className='text-md'>New User? Create an Account!</h3>
                        <button onClick={() => handleAuthModal('signup')} className='bg-emerald-green hover:bg-deep-green rounded-lg p-2 mb-8'>Sign Up</button>
                    </div>
                )}
                </div>
            </div>
            
            <Modal 
                    showModal={showAuthModal} 
                    onClose={() => setShowAuthModal(false)}
                >
                    {modalContent === 'signin' ? <SignInForm onSuccess={() => setShowAuthModal(false)} /> : <SignUpForm />}
                </Modal>
                <Modal 
                    showModal={showAccountModal} 
                    onClose={() => setShowAccountModal(false)}
                >
                    <AccountSettingsForm />
                </Modal>
        </div>
    )
}

export default SideNavbar;