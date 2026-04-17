import { useState } from 'react';
import { Hero, SideNavbar } from '../components';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
    const { isAuthenticated } = useAuth();
    return(
        <div className='min-h-screen bg-cream'>
            <Hero />
        </div>
    );
}

export default Landing;