import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Header, Footer, SideNavbar } from '../components';
import { Hero, ScheduleCard } from '../pages';

const Home = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div className = "bg-[#cbd5c0]">
            <Header />
            {isAuthenticated && <SideNavbar />}
            <main className = {isAuthenticated ? "ml-64" : "ml-0"}>
                <Hero />
                <ScheduleCard />
            </main>
            <Footer />
        </div>
    )
}

export default Home;