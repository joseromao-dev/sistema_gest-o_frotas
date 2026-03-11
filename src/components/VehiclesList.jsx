import { Truck, CheckCircle2, Wrench, AlertCircle, ChevronRight } from 'lucide-react';

const VehiclesList = ({ vehicles = [] }) => {
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Ativo':
        return {
          icon: <CheckCircle2 size={14} />,
          color: 'text-emerald-600 bg-emerald-50 ring-emerald-600/20',
          label: 'Operacional'
        };
      case 'Em Manutenção':
        return {
          icon: <Wrench size={14} />,
          color: 'text-amber-600 bg-amber-50 ring-amber-600/20',
          label: 'Manutenção'
        };
      default:
        return {
          icon: <AlertCircle size={14} />,
          color: 'text-rose-600 bg-rose-50 ring-rose-600/20',
          label: 'Indisponível'
        };
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-white to-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Frota de Veículos</h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">{vehicles.length} unidades registradas</p>
        </div>
        <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
          <Truck size={20} />
        </button>
      </div>
      
      <div className="divide-y divide-gray-50">
        {vehicles.map((vehicle, idx) => {
          const status = getStatusInfo(vehicle.status);
          return (
            <div key={idx} className="p-6 hover:bg-gray-50/50 transition-all group cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${status.color.split(' ')[1]} ${status.color.split(' ')[0]}`}>
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{vehicle.placa}</h4>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{vehicle.modelo}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${status.color}`}>
                  {status.icon}
                  {status.label}
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-6 bg-gray-50/50 text-center border-t border-gray-50">
        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto">
          Gerenciar Frota Completa
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default VehiclesList;
