import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Toast from '../components/Toast';

const Settings = () => {
  const [toast, setToast] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setToast({ message: 'Configurações salvas com sucesso!', type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Configurações</h2>
        <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
          Preferências globais e personalização do sistema
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 max-w-3xl hover:shadow-xl transition-all duration-500">
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome da Empresa</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
                placeholder="Fera Alda Gestão"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email de Suporte</label>
              <input
                type="email"
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
                placeholder="suporte@feraalda.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fuso Horário</label>
            <select className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 cursor-pointer appearance-none">
              <option>(GMT+01:00) Luanda, Angola</option>
              <option>(GMT+00:00) Lisboa, Portugal</option>
            </select>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
            <button
              type="submit"
              className="flex-1 md:flex-none px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase text-xs tracking-widest flex items-center justify-center gap-2 group"
            >
              <Save size={18} className="transition-transform group-hover:scale-110" />
              Salvar Alterações
            </button>
            <button
              type="button"
              className="flex-1 md:flex-none px-8 py-4 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 group"
            >
              <X size={18} className="transition-transform group-hover:rotate-90" />
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Settings;
