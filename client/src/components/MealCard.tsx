import type { Meal } from '../types/meals';

type MealCardProps = {
    meal: Meal;
    showActions?: boolean;
    onUpdate?: () => void;
    onDelete?: () => void;
    onSelect?: () => void;
}

const MealCard = ({ meal, showActions, onUpdate, onDelete, onSelect }: MealCardProps) => {
    return (
        <div onClick={onSelect} className='bg-off-white rounded-lg shadow-md flex flex-col p-4 gap-2 cursor-pointer hover:shadow-lg transition font-serif duration-300 overflow-y-auto max-h-[80vh]'>
            <h2 className='text-xl font-bold text-warm-brown underline underline-offset-4 decoration-2'>{meal.name}</h2>
            <p className='text-sm text-warm-brown'>Meal Category: {meal.category}</p>
            <p className='text-sm text-warm-brown'>Servings: {meal.servings}</p>

            {showActions && (
                <div className='flex flex-row gap-2'>
                    <button onClick={(e) => { e.stopPropagation(); onUpdate?.() }} className='rounded-md bg-emerald-green hover:bg-deep-green text-warm-brown p-4'>Update</button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete?.() }} className='rounded-md bg-terracotta text-warm-brown p-4'>Delete</button>
                </div>
            )}
        </div>
    );
}

export default MealCard;