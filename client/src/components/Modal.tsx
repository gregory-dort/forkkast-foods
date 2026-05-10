type ModalProps = {
    showModal: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ showModal, onClose, children }: ModalProps) => {
    if (!showModal) { return null; }

    return (
        <div className = "fixed inset-0 bg-cream/70 flex items-center justify-center z-50">
            {/* Modal Container */ }
            <div className = "relative bg-mint p-8 w-4xl min-h-[300px] rounded-lg shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-emerald-green hover:bg-deep-green transition duration-300 px-4 py-2 font-medium text-warm-brown rounded-full">
                        &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;