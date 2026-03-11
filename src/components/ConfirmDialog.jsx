import { AlertCircle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, danger = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className={`p-6 bg-gradient-to-r ${danger ? 'from-red-50 to-red-100' : 'from-yellow-50 to-amber-100'}`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${danger ? 'bg-red-200/50' : 'bg-yellow-200/50'}`}>
              <AlertCircle className={danger ? 'text-red-700' : 'text-yellow-700'} size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-8 justify-end">
            <button
              onClick={onCancel}
              className="px-5 py-2 text-gray-700 font-semibold hover:bg-gray-200 rounded-xl transition-all hover:scale-105 transform duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className={`px-5 py-2 text-white font-semibold rounded-xl transition-all hover:scale-105 transform duration-200 shadow-lg ${
                danger ? 'bg-gradient-to-r from-red-600 to-red-700 hover:shadow-red-200/50' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-200/50'
              }`}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
