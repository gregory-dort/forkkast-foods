import { useRef, useEffect } from 'react';
import useMeals from '../hooks/useMeals';
import { useAuth } from '../contexts/AuthContext';
import { Hero } from '../components';
import { ScheduleCard, RecentMealsCard } from '../pages';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const scheduleRef = useRef<HTMLDivElement>(null);
    
    const { meals, fetchMeals, isLoading } = useMeals();

    useEffect(() => {
        fetchMeals();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    const scrollToSchedule = () => {
        scheduleRef.current?.scrollIntoView({ behavior: 'smooth'});
    }

    return (
        <div className = "bg-cream min-h-screen mt-24">
            <Hero scrollToSchedule={scrollToSchedule} />
            <main ref={scheduleRef}>
                <RecentMealsCard meals={meals} />
                <ScheduleCard />
            </main>
        </div>
    )
}

export default Home;