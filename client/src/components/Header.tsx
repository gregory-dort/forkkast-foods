//import { useState } from 'react';
import { Link } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';

const Header = () => {

    return (
        <>
            <div className = "fixed top-0 bg-tan w-full flex flex-row shadow-lg justify-center items-center p-2 z-50">
                {/* Left of Navbar */}
                <div className = "flex-none w-1/2 flex justify-start items-center">
                    <Link to='/home'>
                        <img src="/images/preptime-logo.png" alt="PrepTime Logo" className = "h-20 w-auto max-w-full"/>
                    </Link>
                </div>

                {/* Right Side of Navbar */}
                <div className = "w-1/2 flex justify-end items-center space-x-4">
                    {/* Needs conditional rendering later on. Currently adding all buttons needed to the Navbar and will fix later*/}
                </div>
            </div>
        </>
        
    )
}

export default Header;