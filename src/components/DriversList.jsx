import { Users, MapPin, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const DriversList = ({ drivers = [] }) => {
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Disponível':
        return {
          icon: <MapPin size={14} />,
          color: 'text-emerald-600 bg-emerald-50 ring-emerald-600/20',
          label: 'Disponível'
        };
      case 'Em Viagem':
        return {
          icon: <Clock size={14} />,
          color: 'text-blue-600 bg-blue-50 ring-blue-600/20',
          label: 'Em Rota'
        };
      default:
        return {
          icon: <AlertCircle size={14} />,
          color: 'text-gray-600 bg-gray-50 ring-gray-600/20',
          label: 'Off-line'
        };
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-white to-gray-50/50">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Equipa de Motoristas</h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">{drivers.length} colaboradores ativos</p>
        </div>
        <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
          <Users size={20} />
        </button>
      </div>
      
      <div className="divide-y divide-gray-50">
        {drivers.map((driver, idx) => {
          const status = getStatusInfo(driver.status);
          return (
            <div key={idx} className="p-6 hover:bg-gray-50/50 transition-all group cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-50 flex items-center justify-center text-gray-400 font-black text-lg transition-all group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white duration-300">
                    {driver.nome.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${status.color.split(' ')[1].replace('bg-', 'bg-')}`}></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{driver.nome}</h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">ID: #DRV-{100 + idx}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ring-1 ring-inset ${status.color}`}>
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
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center justify-center gap-2 mx-auto">
          Escala de Trabalho
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DriversList;
