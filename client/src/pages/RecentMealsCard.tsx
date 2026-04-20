import { SectionCard, MealCard } from "../components";
import type { Meal } from '../types/meals';

type RecentMealsProps = {
    meals: Meal[];
}

const RecentMealsCard = ({ meals }: RecentMealsProps) => {
    const recentMeals = meals
        .sort((a, b) => new Date(b.updated_at!).getTime() - new Date(a.created_at!).getTime())
        .slice(0,3)
    
    return (
        <section id = "meal-list" className = "py-24 container mx-auto px-4">
            <h1 className = "text-3xl font-serif font-bold mb-8 text-center text-warm-brown"> 
                    Recent Meals
            </h1>
            <SectionCard>
               {recentMeals.length === 0 ?(
                    <div className='text-center font-serif font-medium text-charcoal py-8'>
                        <p>
                            No meals added yet.
                        </p>
                        <p>
                            Head to the meals page to add your first meal!
                        </p>
                    </div>
               ) : (
                    <div className='grid grid-cols-3 gap-4'>
                        {recentMeals.map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
               )}
            </SectionCard>
        </section>
    );
}

export default RecentMealsCard;