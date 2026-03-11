import { Users, MapPin, Clock, AlertCircle } from 'lucide-react';

const DriversList = ({ drivers = [] }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Disponível':
        return <MapPin size={16} className="text-green-600" />;
      case 'Em Viagem':
        return <Clock size={16} className="text-blue-600" />;
      default:
        return <AlertCircle size={16} className="text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disponível':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200';
      case 'Em Viagem':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-xl mr-4">
          <Users size={28} className="text-indigo-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Motoristas</h3>
          <p className="text-sm text-gray-600 mt-1">Total de {drivers.length} motoristas ativos</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {drivers.map((driver, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all hover:shadow-md hover:scale-105 transform duration-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                {driver.nome.charAt(0)}
              </div>
              <p className="text-sm font-bold text-gray-900">{driver.nome}</p>
            </div>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md ${getStatusColor(driver.status)}`}>
              {getStatusIcon(driver.status)}
              {driver.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversList;
