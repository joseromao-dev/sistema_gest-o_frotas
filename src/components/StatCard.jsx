const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-5">
        <div className={`p-3 rounded-xl ${color} ring-4 ring-opacity-10 ${color.replace('bg-', 'ring-')} transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Ao Vivo</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
          <span className="text-xs font-medium text-gray-400">Total</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
