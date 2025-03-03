// components/Popup.tsx
import React from "react";

interface PopupProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="font bold absolute right-2 top-2 w-20 rounded-lg bg-red-600 py-3 text-3xl text-white hover:text-red-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

/*  className="px-6 py-3 text-2xl font-bold bg-red-600
 text-white rounded-lg hover:bg-red-800 transition-transform 
 transform scale-110" */
