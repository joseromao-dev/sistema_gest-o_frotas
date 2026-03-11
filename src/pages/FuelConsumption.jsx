import { Fuel, TrendingUp, BarChart3, DollarSign } from 'lucide-react';
import { fleetData } from '../data/fleetData';

const FuelConsumption = () => {
  const data = fleetData.fuelConsumption;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Consumo de Combustível</h2>
        <p className="text-gray-600 mt-1">Monitoramento e análise de consumo mensal</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Fuel className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Consumo Total do Mês</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">1,250 L</h3>
          <p className="text-xs text-green-600 mt-2">↓ 5% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Custo Total</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">Kz 250,000</h3>
          <p className="text-xs text-gray-500 mt-2">30 dias</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Consumo Médio/Dia</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">41.7 L</h3>
          <p className="text-xs text-gray-500 mt-2">~200 KM</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Consumo Previsão</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">1,205 L</h3>
          <p className="text-xs text-green-600 mt-2">Próximos 30 dias</p>
        </div>
      </div>

      {/* Tabela de Consumo Diário */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Histórico de Consumo</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Litros Consumidos</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Custo (Kz)</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Preço/Litro</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">{item.data}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{item.consumo} L</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">Kz {item.custo.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Kz {(item.custo / item.consumo).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FuelConsumption;
