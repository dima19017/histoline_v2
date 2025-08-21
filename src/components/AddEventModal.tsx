import React, { useEffect, useRef } from 'react';

interface AddEventModalProps {
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close modal on Esc key press
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Close modal if clicking outside the dialog
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <div 
      ref={backdropRef} 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded shadow-lg relative w-80 text-center">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" 
          onClick={onClose} 
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Добавить событие</h2>
        <p className="text-gray-700">Скоро...</p>
      </div>
    </div>
  );
};

export default AddEventModal;
