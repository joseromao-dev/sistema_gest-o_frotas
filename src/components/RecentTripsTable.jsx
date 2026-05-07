import { Navigation, MapPin, ArrowRight, User, Truck } from 'lucide-react';

const RecentTripsTable = ({ trips = [] }) => {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full border-separate border-spacing-y-4 px-2">
        <thead>
          <tr>
            <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Motorista</th>
            <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Veículo</th>
            <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Itinerário</th>
            <th className="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Distância</th>
            <th className="text-right py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Ações</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, idx) => (
            <tr key={idx} className="group transition-all duration-500 hover:translate-x-1">
              <td className="py-5 px-6 bg-white border-y border-l border-slate-100 first:rounded-l-[1.5rem] shadow-sm group-hover:shadow-md group-hover:bg-slate-50 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <User size={20} />
                  </div>
                  <span className="text-sm font-black text-slate-900 tracking-tight">{trip.motorista}</span>
                </div>
              </td>
              <td className="py-5 px-6 bg-white border-y border-slate-100 shadow-sm group-hover:shadow-md group-hover:bg-slate-50 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500">
                    <Truck size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-600 tracking-tight">{trip.veiculo}</span>
                </div>
              </td>
              <td className="py-5 px-6 bg-white border-y border-slate-100 shadow-sm group-hover:shadow-md group-hover:bg-slate-50 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
                    <MapPin size={14} className="text-blue-500" />
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{trip.origem}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-4 h-px bg-slate-200"></div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    <div className="w-4 h-px bg-slate-200"></div>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
                    <MapPin size={14} className="text-rose-500" />
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{trip.destino}</span>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6 bg-white border-y border-slate-100 shadow-sm group-hover:shadow-md group-hover:bg-slate-50 transition-all duration-500">
                <div className="flex flex-col items-start gap-1">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
                    {trip.km} km
                  </span>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
                    <div className="bg-blue-500 h-full rounded-full w-2/3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6 bg-white border-y border-r border-slate-100 last:rounded-r-[1.5rem] text-right shadow-sm group-hover:shadow-md group-hover:bg-slate-50 transition-all duration-500">
                <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 ml-auto group/btn">
                  <Navigation size={20} className="group-hover/btn:scale-110 transition-transform" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTripsTable;
