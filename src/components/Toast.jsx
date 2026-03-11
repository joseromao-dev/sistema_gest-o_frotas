import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const icon = type === 'success' ? (
    <CheckCircle className="text-green-600" size={22} />
  ) : (
    <AlertCircle className="text-red-600" size={22} />
  );

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} border rounded-xl shadow-2xl p-5 flex items-center gap-4 max-w-sm z-50 animate-in slide-in-from-bottom-6 fade-in duration-300`}>
      <div className={`flex-shrink-0 p-2 rounded-lg ${type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
        {icon}
      </div>
      <p className={`text-sm font-semibold flex-1 ${textColor}`}>{message}</p>
      <button onClick={onClose} className={`ml-2 p-1 hover:bg-white/50 rounded-lg transition-colors ${textColor}`}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
