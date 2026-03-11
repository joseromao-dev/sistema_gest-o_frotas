import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-200`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800 sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/80 dark:hover:bg-slate-800 rounded-xl transition-all hover:scale-110 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
