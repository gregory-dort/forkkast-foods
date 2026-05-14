import type { Meal } from '../types/meals';

type MealDetailModalProps = {
    meal: Meal;
    onUpdate: () => void;
    onDelete: () => void;
}

const MealDetailModal = ({ meal, onUpdate, onDelete }: MealDetailModalProps) => {
    return (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-serif font-bold text-warm-brown">{meal.name}</h2>

            <div className="flex flex-col gap-2">
                <p className="text-warm-brown"><span className="font-bold">Category:</span> {meal.category}</p>
                <p className="text-warm-brown"><span className="font-bold">Servings:</span> {meal.servings}</p>
                <p className="text-warm-brown"><span className="font-bold">Prep Time:</span> {meal.prep_time_minutes} minutes</p>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-warm-brown">Ingredients</h3>
                <ul className="list-disc list-inside">
                    {meal.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-warm-brown">
                            {ingredient.name}
                            {ingredient.amount && ` — ${ingredient.amount}`}
                            {ingredient.unit && ` ${ingredient.unit}`}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-warm-brown">Instructions</h3>
                <p className="text-warm-brown">{meal.instructions}</p>
            </div>

            <div className="flex flex-row gap-4 justify-end">
                <button
                    onClick={onUpdate}
                    className="px-4 py-2 rounded-md bg-harvest-gold text-warm-brown transition duration-300"
                >
                    Update
                </button>
                <button
                    onClick={onDelete}
                    className="px-4 py-2 rounded-md bg-terracotta text-warm-brown hover:opacity-90 transition duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default MealDetailModal;