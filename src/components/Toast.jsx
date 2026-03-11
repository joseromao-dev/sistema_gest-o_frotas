import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' 
    ? 'bg-white dark:bg-slate-900 border-green-100 dark:border-emerald-500/20' 
    : 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-500/20';
  const textColor = type === 'success' ? 'text-gray-800 dark:text-emerald-400' : 'text-gray-800 dark:text-red-400';
  const icon = type === 'success' ? (
    <CheckCircle className="text-emerald-500" size={22} />
  ) : (
    <AlertCircle className="text-red-500" size={22} />
  );

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} border rounded-[1.5rem] shadow-2xl dark:shadow-black/40 p-5 flex items-center gap-4 max-w-sm z-50 animate-in slide-in-from-bottom-6 fade-in duration-300`}>
      <div className={`flex-shrink-0 p-2.5 rounded-xl ${type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
        {icon}
      </div>
      <p className={`text-sm font-bold flex-1 ${textColor}`}>{message}</p>
      <button onClick={onClose} className="ml-2 p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-gray-400">
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
