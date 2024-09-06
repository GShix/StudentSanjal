import React from 'react';

interface ModalProps {
    src: string;
    description: string;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ src, description, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg mx-4 w-full">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={closeModal}
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
                <div className="p-4">
                    <img
                        src={src}
                        alt="Modal content"
                        className="w-full h-auto rounded-md"
                    />
                    <div className="mt-4">
                        <p className="text-gray-700">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
