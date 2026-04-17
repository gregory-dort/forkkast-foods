import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
        <div ref={sidebarRef} className={`fixed left-0 h-screen shadow-md p-2 z-50 bg-mint mt-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-10'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="self-end p-1 text-warm-brown"
            >
                {isOpen ? '←' : '→'}
            </button>

            {isOpen && (
                <div className = 'flex flex-col w-full'>
                    {isAuthenticated ? (
                        <div>
                            <p>{user?.name}</p>
                            <button onClick={handleAccountModal}>Account Settings</button>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                ) : (
                    <div>
                        <button onClick={() => handleAuthModal('signin')}>Sign In</button>
                        <button onClick={() => handleAuthModal('signup')}>Sign Up</button>
                    </div>
                )}
                </div>
            )}
            
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