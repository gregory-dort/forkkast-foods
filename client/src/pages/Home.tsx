import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Header, Footer, SideNavbar, Hero } from '../components';
import { ScheduleCard } from '../pages';
import MealCard from './MealCard';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className = "bg-cream min-h-screen">
            <Hero />
            <main className={isAuthenticated ? 'ml-64' : 'ml-0'}>
                <ScheduleCard />
                <MealCard />
            </main>
        </div>
    )
}

export default Home;