import { SectionCard, Meals } from "../components";

const MealList = () => {
    return (
        <section id = "meal-list" className = "py-24 container mx-auto px-4">
            <h1 className = "text-3xl font-serif font-bold mb-8 text-center text-[#f7879a]"> 
                    Meal List
            </h1>
            <SectionCard>
                <Meals />
            </SectionCard>
        </section>
    );
}

export default MealList;