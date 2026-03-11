import { Fuel, TrendingUp, BarChart3, DollarSign, Download, Plus } from 'lucide-react';
import { useState } from 'react';
import { fleetData } from '../data/fleetData';
import Toast from '../components/Toast';

const FuelConsumption = () => {
  const [toast, setToast] = useState(null);
  const data = fleetData.fuelConsumption;

  const handleExport = () => {
    setToast({ message: 'Os dados de consumo foram exportados com sucesso!', type: 'success' });
  };

  const handleNewFuel = () => {
    setToast({ message: 'Abrindo formulário de novo abastecimento...', type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Consumo de Combustível</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Monitoramento e análise de eficiência energética
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 group"
          >
            <Download size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            Exportar Dados
          </button>
          <button 
            onClick={handleNewFuel}
            className="px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group"
          >
            <Plus size={18} className="transition-transform group-hover:rotate-90" />
            Novo Abastecimento
          </button>
        </div>
      </div>

      {/* Cards de Resumo Modernos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
          <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <Fuel className="text-amber-600" size={28} />
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Consumo Total</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">1,250 L</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp size={12} className="rotate-180" />
              5%
            </span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
          <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <DollarSign className="text-blue-600" size={28} />
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Custo Total</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Kz 250k</h3>
          <p className="text-[10px] font-bold text-gray-400 mt-2">Últimos 30 dias</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
          <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <BarChart3 className="text-indigo-600" size={28} />
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Média Diária</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter">41.7 L</h3>
          <p className="text-[10px] font-bold text-gray-400 mt-2">~200 KM percorridos</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
          <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp className="text-emerald-600" size={28} />
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Previsão</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter">1,205 L</h3>
          <p className="text-[10px] font-bold text-emerald-500 mt-2">Economia projetada</p>
        </div>
      </div>

      {/* Tabela de Consumo Diário Premium */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h3 className="text-xl font-black text-gray-900">Histórico de Abastecimento</h3>
          <button className="text-blue-600 text-sm font-black hover:underline uppercase tracking-widest">Ver Completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/20">
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Data de Registro</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Volume (Litros)</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Custo Operacional</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Preço Unitário</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/20 transition-colors group">
                  <td className="py-6 px-8 text-sm font-black text-gray-900">{item.data}</td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-amber-500/20 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-2/3 rounded-full"></div>
                      </div>
                      <span className="text-sm font-black text-gray-700">{item.consumo} L</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-sm font-black text-gray-900">Kz {item.custo.toLocaleString()}</td>
                  <td className="py-6 px-8">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                      Kz {(item.custo / item.consumo).toFixed(2)} / L
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default FuelConsumption;
