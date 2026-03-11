import { Fuel, TrendingDown } from 'lucide-react';

const FuelPanel = ({ monthlyConsumption = '1,250 L', monthlyCost = 'Kz 250,000' }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-8 rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-xl mr-4 shadow-lg">
            <Fuel size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Consumo de Combustível</h3>
            <p className="text-sm text-gray-600 mt-1">Análise mensal</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/70 backdrop-blur p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">Consumo Total</p>
          <p className="text-4xl font-bold text-gray-900 mt-3">{monthlyConsumption}</p>
          <p className="text-xs text-amber-600 mt-2 font-semibold">Média diária: 41.7 L</p>
        </div>
        <div className="bg-white/70 backdrop-blur p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">Custo Mensal</p>
          <p className="text-4xl font-bold text-gray-900 mt-3">{monthlyCost}</p>
          <p className="text-xs text-amber-600 mt-2 font-semibold">Por litro: 200 Kz</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 flex items-center gap-3">
        <TrendingDown size={20} className="text-green-600 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-green-900">Redução de 5% vs mês anterior</p>
          <p className="text-xs text-green-700 mt-1">Excelente eficiência na frota!</p>
        </div>
      </div>
    </div>
  );
};

export default FuelPanel;
