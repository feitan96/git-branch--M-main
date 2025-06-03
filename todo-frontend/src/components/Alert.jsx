import React from 'react';

const Alert = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`mb-4 p-4 border rounded-lg flex justify-between items-center ${getAlertStyles()}`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-sm font-medium hover:opacity-70"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;