const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 float-right"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
