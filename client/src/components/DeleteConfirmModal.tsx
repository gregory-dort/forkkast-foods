import type { Meal } from '../types/meals';

type DeleteConfirmModalProps = {
    meal: Meal | null;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmModal = ({ meal, onConfirm, onCancel }: DeleteConfirmModalProps) => {
    return (
        <div className='flex flex-col gap-4 overflow-y-auto max-h-[80vh]'>
            <h2 className="text-2xl font-serif font-bold text-warm-brown">Delete Meal</h2>
            <p className="text-warm-brown">
                Are you sure you want to delete <span className="font-bold">{meal?.name}</span>? This action cannot be undone.
            </p>
            <div className='flex flex-row gap-4'>
                <button
                    onClick={onCancel}
                    className='bg-cream p-4 text-warm-brown rounded-md hover:bg-harvest-gold transition duration-300'
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className='bg-cream p-4 text-warm-brown rounded-md hover:opacity-90 hover:bg-terracotta transition duration-300'
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteConfirmModal;