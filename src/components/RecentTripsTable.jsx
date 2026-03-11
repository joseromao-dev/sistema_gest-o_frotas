import { Navigation, MapPin, ArrowRight, User, Truck } from 'lucide-react';

const RecentTripsTable = ({ trips = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="text-left py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Motorista</th>
            <th className="text-left py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Veículo</th>
            <th className="text-left py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Itinerário</th>
            <th className="text-left py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Distância</th>
            <th className="text-right py-5 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {trips.map((trip, idx) => (
            <tr key={idx} className="group hover:bg-blue-50/30 transition-all duration-300">
              <td className="py-5 px-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{trip.motorista}</span>
                </div>
              </td>
              <td className="py-5 px-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <Truck size={16} />
                  </div>
                  <span className="text-sm font-bold text-gray-600 group-hover:text-blue-900 transition-colors">{trip.veiculo}</span>
                </div>
              </td>
              <td className="py-5 px-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin size={12} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-700">{trip.origem}</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-300" />
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                    <MapPin size={12} className="text-rose-500" />
                    <span className="text-xs font-bold text-gray-700">{trip.destino}</span>
                  </div>
                </div>
              </td>
              <td className="py-5 px-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider ring-1 ring-blue-700/10">
                  {trip.km} km
                </span>
              </td>
              <td className="py-5 px-8 text-right">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Navigation size={18} />
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
