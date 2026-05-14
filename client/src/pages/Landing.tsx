import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LandingHero } from '../components';

const Landing = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/home', { replace: true }); // ← kick logged-in users to /home
        }
    }, [isAuthenticated, isLoading]);

    return(
        <div className='min-h-screen bg-cream mt-24 p-6'>
            <LandingHero />
        </div>
    );
}

export default Landing;