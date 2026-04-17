import { SectionCard, Meals } from "../components";

const MealCard = () => {
    return (
        <section id = "meal-list" className = "py-24 container mx-auto px-4">
            <h1 className = "text-3xl font-serif font-bold mb-8 text-center text-warm-brown"> 
                    Meal List
            </h1>
            <SectionCard>
                <Meals />
            </SectionCard>
        </section>
    );
}

export default MealCard;