import { Fuel, TrendingDown } from 'lucide-react';

const FuelPanel = ({ monthlyConsumption = '1,250 L', monthlyCost = 'Kz 250,000' }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl dark:hover:shadow-slate-950/30 transition-all duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm">
            <Fuel size={28} />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-50 tracking-tight">Consumo</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Análise Mensal</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-gray-50/50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em]">Volume</p>
          <p className="text-2xl font-black text-gray-900 dark:text-gray-50 mt-2">{monthlyConsumption}</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 dark:text-emerald-400">
            <TrendingDown size={12} />
            <span className="text-[10px] font-bold">-4.2%</span>
          </div>
        </div>
        <div className="bg-gray-50/50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em]">Custo</p>
          <p className="text-2xl font-black text-gray-900 dark:text-gray-50 mt-2">{monthlyCost}</p>
          <div className="flex items-center gap-1 mt-2 text-gray-400 dark:text-gray-500">
            <span className="text-[10px] font-bold">Kz 200/L</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/10 flex items-center gap-3 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <TrendingDown size={18} />
        </div>
        <div>
          <p className="text-xs font-black text-emerald-900 dark:text-emerald-400 uppercase tracking-wide">Eficiência Aumentada</p>
          <p className="text-[10px] text-emerald-700 dark:text-emerald-500/80 font-bold mt-0.5">Economia detectada vs período anterior</p>
        </div>
      </div>
    </div>
  );
};

export default FuelPanel;
