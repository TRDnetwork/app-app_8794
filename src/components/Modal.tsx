import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop:bg-black/40 p-0 m-0 border-0"
      onClick={(e) => {
        const dialog = dialogRef.current;
        if (dialog && e.target === dialog) {
          onClose();
        }
      }}
    >
      <div className="modal-box relative bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-[#1a1a1a] hover:bg-black/5"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{title}</h3>
        <div>{children}</div>
      </div>
    </dialog>
  );
};