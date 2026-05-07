import { useState } from 'react';
import { Save, X } from 'lucide-react';
import Toast from '../components/Toast';

const Settings = () => {
  const [toast, setToast] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setToast({ message: 'Configurações do EduGest salvas com sucesso!', type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Configurações</h2>
        <p className="text-slate-500 mt-2 max-w-2xl">Defina as preferências do sistema e atualize informações essenciais da escola.</p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm max-w-3xl">
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Nome da escola</span>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="EduGest Instituto"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email de suporte</span>
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="suporte@edugest.com"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Fuso horário</span>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
                <option>(GMT+01:00) Luanda, Angola</option>
                <option>(GMT+00:00) Lisboa, Portugal</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Formato de nota</span>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
                <option>10 valores</option>
                <option>20 valores</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Save size={18} />
              Salvar alterações
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <X size={18} />
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
