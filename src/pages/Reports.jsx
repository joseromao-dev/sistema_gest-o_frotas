import { FileText, Download, Calendar, Filter, Plus } from 'lucide-react';
import { useState } from 'react';
import Toast from '../components/Toast';

const Reports = () => {
  const [toast, setToast] = useState(null);
  const reports = [
    { id: 1, name: 'Relatório de Frotas', type: 'PDF', date: '09/03/2024', size: '2.4 MB' },
    { id: 2, name: 'Análise de Combustível', type: 'Excel', date: '09/03/2024', size: '1.2 MB' },
    { id: 3, name: 'Histórico de Viagens', type: 'PDF', date: '08/03/2024', size: '3.1 MB' },
    { id: 4, name: 'Manutenção Programada', type: 'Excel', date: '07/03/2024', size: '0.8 MB' },
  ];

  const handleDownload = (name) => {
    setToast({ message: `O relatório "${name}" foi baixado com sucesso!`, type: 'success' });
  };

  const handleNewReport = () => {
    setToast({ message: 'Um novo relatório está sendo gerado...', type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Relatórios</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Exportação de dados e inteligência operacional
          </p>
        </div>
        <button 
          onClick={handleNewReport}
          className="px-6 py-3 bg-blue-600 rounded-2xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
        >
          <Plus size={20} className="transition-transform group-hover:rotate-90" />
          GERAR NOVO RELATÓRIO
        </button>
      </div>

      {/* Filtros Modernos */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-xl transition-all duration-500">
        <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
          <Filter size={20} />
        </div>
        <input
          type="text"
          placeholder="Procurar relatórios por nome ou data..."
          className="flex-1 bg-transparent outline-none font-medium text-gray-700 placeholder:text-gray-400"
        />
        <div className="h-8 w-px bg-gray-100 hidden md:block"></div>
        <select className="hidden md:block bg-transparent outline-none font-black text-[10px] uppercase tracking-widest text-gray-500 cursor-pointer">
          <option>Todos os formatos</option>
          <option>PDF</option>
          <option>Excel</option>
        </select>
      </div>

      {/* Lista de Relatórios Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">{report.name}</h3>
                <div className="flex items-center gap-4 mt-1.5">
                  <span className="bg-gray-900 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">{report.type}</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                    <Calendar size={14} className="text-blue-500" />
                    {report.date}
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">{report.size}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDownload(report.name)}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all shadow-inner"
            >
              <Download size={20} />
            </button>
          </div>
        ))}
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

export default Reports;
