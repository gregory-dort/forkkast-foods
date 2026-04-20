import { useState } from 'react';
import type { Ingredient, Meal, MealFormData } from '../types/meals';

type MealFormModalProps = {
    meal: Meal | null;
    onSubmit: (mealData: MealFormData) => Promise<void>;
}

const MealFormModal = ({ meal, onSubmit }: MealFormModalProps) => {
    const [name, setName] = useState(meal?.name || '');
    const [ingredients, setIngredients] = useState<Ingredient[]>(meal?.ingredients || []);
    const [servings, setServings] = useState(meal?.servings || 1);
    const [instructions, setInstructions] = useState(meal?.instructions || '');
    const [prepTime, setPrepTime] = useState(meal?.prep_time_minutes || 0);
    const [category, setCategory] = useState(meal?.category || '');
    const [error, setError] = useState('');
    const [ingredientInput, setIngredientInput] = useState<{name: string, amount: string, unit: string}>({ name: '', amount: '', unit: ''});

    const handleAddIngredient = () => {
        if (ingredientInput.name.trim() === '') return;

        setIngredients(prev => [...prev, {
        name: ingredientInput.name.trim(),
        amount: ingredientInput.amount ? Number(ingredientInput.amount) : undefined,
        unit: ingredientInput.unit.trim() || undefined
        }]);

        setIngredientInput({ name: '', amount: '', unit: ''});
    } 

    const handleRemoveIngredient = (index: number) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!category) {
            setError('Please select a category');
            return;
        }

        if (ingredients.length === 0) {
            setError('Please add at least one ingredient');
            return;
        }

        try {
            await onSubmit({
                name,
                ingredients,
                servings,
                instructions,
                prep_time_minutes: prepTime,
                category
            })
        } catch {
            setError('An unexpected error occurred. Please try again.')
        }
    }

    return (
        <div className='flex flex-col gap-4 overflow-y-auto max-h-[80vh]'>
            <h2 className='text-2xl font-serif font-bold text-warm-brown'>
                {meal ? 'Update Meal' : 'Add Meal'}
            </h2>

            {error && <p className='text-terracotta'>{error}</p>}

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-warm-brown'>Meal Name</label>
                    <input
                        type='text'
                        placeholder='Enter Meal Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md border-tan bg-cream px-4 py-2 focus:outline-none"
                        required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className="text-sm font-medium text-warm-brown">Category</label>
                    <div className="flex flex-row gap-2">
                        {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((categoryName) => (
                        <button
                            key={categoryName}
                            type="button"
                            onClick={() => setCategory(categoryName)}
                            className={`px-4 py-2 rounded-md transition duration-300 ${
                                category === categoryName
                                ? 'bg-forest-green text-warm-brown'
                                : 'bg-off-white text-warm-brown hover:bg-cream'
                            }`}
                        >
                        {categoryName}
                        </button>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <label className="text-sm font-medium text-warm-brown">Ingredients</label>
                    <div className='flex flex-row gap-2'>
                        <input
                            type="text"
                            value={ingredientInput.name}
                            onChange={(e) => setIngredientInput(prev => ({ ...prev, name: e.target.value }))}
                            className="rounded-md border-tan bg-cream px-4 py-2 focus:outline-none flex-1"
                            placeholder="Ingredient name"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddIngredient();
                                }
                            }}
                         />
                        <input
                            type="number"
                            value={ingredientInput.amount}
                            onChange={(e) => setIngredientInput(prev => ({ ...prev, amount: e.target.value }))}
                            className="rounded-md border-tan bg-cream px-4 py-2 focus:outline-none w-20"
                            placeholder="Amount"
                        />
                        <input
                            type="text"
                            value={ingredientInput.unit}
                            onChange={(e) => setIngredientInput(prev => ({ ...prev, unit: e.target.value }))}
                            className="rounded-md border-tan bg-cream px-4 py-2 focus:outline-none w-24"
                            placeholder="Unit"
                        />
                        <button
                            type="button"
                            onClick={handleAddIngredient}
                            className="bg-forest-green hover:bg-deep-green text-warm-brown px-4 py-2 rounded-md"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="flex flex-col gap-1">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="flex flex-row justify-between items-center bg-cream rounded-md px-4 py-2">
                            <span className="text-warm-brown">
                                {ingredient.name}
                                {ingredient.amount && ` — ${ingredient.amount}`}
                                {ingredient.unit && ` ${ingredient.unit}`}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemoveIngredient(index)}
                                className="text-terracotta hover:opacity-70"
                            >
                                Remove
                            </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-warm-brown'>Servings</label>
                    <input
                    type='number'
                    placeholder='Enter Meal Serving Size'
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className='rounded-md border-tan bg-cream px-4 py-2 focus:outline-none'
                    required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-warm-brown">Prep Time (minutes)</label>
                    <input
                        type='number'
                        placeholder='Enter Cooking Time'
                        value={prepTime}
                        onChange={(e) => setPrepTime(Number(e.target.value))}
                        className="rounded-md border-tan bg-cream px-4 py-2 focus:outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-warm-brown">Instructions</label>
                    <textarea
                        value={instructions}
                        placeholder='Enter Meal Instructions'
                        onChange={(e) => setInstructions(e.target.value)}
                        className="rounded-md border-tan bg-cream px-4 py-2 focus:outline-none"
                        rows={4}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-forest-green hover:bg-deep-green text-warm-brown px-4 py-2 rounded-md"
                >
                    {meal ? 'Update Meal' : 'Add Meal'}
                </button>
            </form>
        </div>
    );
}

export default MealFormModal;