const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={`p-4 rounded-2xl ${color} shadow-lg ${color.replace('bg-', 'shadow-').replace('50', '100')} transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
          {icon}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 shadow-inner group-hover:bg-white transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">Actualizado</span>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter transition-all duration-500 group-hover:text-blue-600 group-hover:scale-105 origin-left">{value}</h3>
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
