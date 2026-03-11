import { Truck, AlertCircle, CheckCircle } from 'lucide-react';

const VehiclesList = ({ vehicles = [] }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Ativo':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'Em Manutenção':
        return <AlertCircle size={18} className="text-orange-600" />;
      default:
        return <AlertCircle size={18} className="text-red-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativo':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200';
      case 'Em Manutenção':
        return 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200';
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl mr-4">
          <Truck size={28} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Veículos da Frota</h3>
          <p className="text-sm text-gray-600 mt-1">Total de {vehicles.length} veículos registrados</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Placa</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Modelo</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors hover:shadow-sm">
                <td className="py-4 px-6 text-sm font-bold text-gray-900">{vehicle.placa}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{vehicle.modelo}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md ${getStatusColor(vehicle.status)}`}>
                    {getStatusIcon(vehicle.status)}
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesList;
