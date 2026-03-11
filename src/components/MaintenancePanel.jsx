import { Wrench, Calendar, AlertCircle } from 'lucide-react';

const MaintenancePanel = ({ maintenances = [] }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Alta':
        return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-800 before:bg-red-500';
      case 'Média':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800 before:bg-yellow-500';
      default:
        return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-800 before:bg-green-500';
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-xl mr-4">
          <Wrench size={28} className="text-orange-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Próximas Manutenções</h3>
          <p className="text-sm text-gray-600 mt-1">Total de {maintenances.length} serviços agendados</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {maintenances.map((maintenance, idx) => (
          <div key={idx} className={`p-5 border-l-4 rounded-xl transition-all hover:shadow-lg hover:scale-105 transform duration-200 ${getPriorityColor(maintenance.prioridade || 'Baixa')} border-2`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} />
                  <p className="text-sm font-bold text-gray-900">{maintenance.servico}</p>
                </div>
                <p className="text-xs opacity-80 mt-2">Veículo: <span className="font-bold">{maintenance.veiculo}</span></p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/60 backdrop-blur`}>
                  <Calendar size={14} />
                  {maintenance.data}
                </span>
                <span className="text-xs font-bold opacity-75 uppercase tracking-wider">
                  Prioridade: {maintenance.prioridade || 'Baixa'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenancePanel;
