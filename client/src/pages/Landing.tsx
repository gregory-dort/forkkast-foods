//import { useState } from 'react';
import { LandingHero } from '../components';
//import { useAuth } from '../hooks/useAuth';

const Landing = () => {
    //const { isAuthenticated } = useAuth();
    return(
        <div className='min-h-screen bg-cream'>
            <LandingHero />
        </div>
    );
}

export default Landing;