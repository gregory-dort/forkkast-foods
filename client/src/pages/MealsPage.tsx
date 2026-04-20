import { useState, useEffect } from 'react';
import useMeals from '../hooks/useMeals';
import type { Meal } from '../types/meals';
import MealCard from '../components/MealCard';
import Modal from '../components/Modal';
import MealDetailModal from '../components/MealDetailModal';
import MealFormModal from '../components/MealFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const MealsPage = () => {
    const { meals, isLoading, error, fetchMeals, addMeal, updateMeal, deleteMeal } = useMeals();
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <div className='bg-cream min-h-screen mt-24 p-6'>
            <h1 className='text-3xl font-serif font-bold text-center text-warm-brown mt-20 mb-8'>My Meals</h1>
            <div className='flex flex-col justify center items-center mb-8'>
                <button 
                    onClick={() => {
                        setIsEditing(false);
                        setShowFormModal(true);
                    }}
                    className='bg-forest-green hover:bg-deep-green text-warm-brown rounded-md shadow-sm p-4'
                >
                    Add Meal
                </button>
            </div>

            {error && <p className='text-lg text-terracotta font-bold mb-4'>{error}</p>}

            {isLoading ? (
                <p className="text-warm-brown text-center">Loading meals...</p>
            ) : meals.length === 0 ? (
                <p className="text-warm-brown text-center">No meals yet. Add your first meal!</p>
            ) : (
                <div className='grid grid-cols-3 gap-4'>
                    {meals.map(meal => (
                        <MealCard 
                            key={meal.id}
                            meal={meal}
                            showActions={true}
                            onSelect={() => { setSelectedMeal(meal); setShowDetailModal(true); }}
                            onUpdate={() => { setSelectedMeal(meal); setIsEditing(true); setShowFormModal(true); }}
                            onDelete={() => { setSelectedMeal(meal); setShowDeleteModal(true); }}
                        />
                    ))}
                </div>
            )}

            <Modal showModal={showDetailModal} onClose={() => setShowDetailModal(false)}>
                {selectedMeal && (
                    <MealDetailModal
                        meal={selectedMeal}
                        onUpdate={() => { setShowDetailModal(false); setIsEditing(true); setShowFormModal(true); }}
                        onDelete={() => { setShowDetailModal(false); setShowDeleteModal(true); }}
                    />
                )}
            </Modal>

            <Modal showModal={showFormModal} onClose={() => setShowFormModal(false)}>
                <MealFormModal
                    meal={isEditing ? selectedMeal : null}
                    onSubmit={async (mealData: Omit<Meal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
                        if (isEditing && selectedMeal) {
                            await updateMeal(selectedMeal.id, mealData);
                        } else {
                            await addMeal(mealData);
                        }
                        setShowFormModal(false);
                    }}
                />
            </Modal>

            <Modal showModal={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <DeleteConfirmModal
                    meal={selectedMeal}
                    onConfirm={async () => {
                        if (selectedMeal) {
                            await deleteMeal(selectedMeal.id);
                            setShowDeleteModal(false);
                            setSelectedMeal(null);
                        }
                    }}
                    onCancel={() => {
                        setShowDeleteModal(false);
                    }}
                />
            </Modal>
        </div>
    );
}

export default MealsPage;