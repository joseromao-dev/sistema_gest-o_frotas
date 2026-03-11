import { Wrench, Calendar, AlertCircle } from 'lucide-react';

const MaintenancePanel = ({ maintenances = [] }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Alta':
        return 'bg-rose-50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-400';
      case 'Média':
        return 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400';
      default:
        return 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl dark:hover:shadow-slate-950/30 transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm">
            <Wrench size={28} />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-50 tracking-tight">Manutenções</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{maintenances.length} agendamentos</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {maintenances.map((maintenance, idx) => (
          <div key={idx} className={`p-5 rounded-2xl transition-all hover:translate-x-1 duration-300 border ${getPriorityColor(maintenance.prioridade || 'Baixa')}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="opacity-70" />
                  <p className="text-sm font-bold tracking-tight">{maintenance.servico}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
                  <p className="text-[11px] font-black uppercase tracking-widest opacity-60">{maintenance.veiculo}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/5">
                  <Calendar size={12} />
                  {maintenance.data}
                </span>
              </div>
            </div>
          </div>
        ))}
        {maintenances.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-400 font-medium">Nenhuma manutenção pendente</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenancePanel;
