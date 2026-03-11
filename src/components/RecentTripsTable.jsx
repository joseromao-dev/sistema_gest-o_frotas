import { Navigation, MapPin } from 'lucide-react';

const RecentTripsTable = ({ trips = [] }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 col-span-full">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-4 rounded-xl mr-4">
          <Navigation size={28} className="text-cyan-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Viagens Recentes</h3>
          <p className="text-sm text-gray-600 mt-1">Últimas {trips.length} viagens registradas</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Motorista</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Veículo</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Origem</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Destino</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Km</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors hover:shadow-sm">
                <td className="py-4 px-6 text-sm font-bold text-gray-900">{trip.motorista}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{trip.veiculo}</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-blue-100">
                      <MapPin size={14} className="text-blue-600" />
                    </div>
                    {trip.origem}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-red-100">
                      <MapPin size={14} className="text-red-600" />
                    </div>
                    {trip.destino}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-gray-900">{trip.km} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTripsTable;
