import { FileText, Download, Calendar, Filter } from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Relatório de Frotas', type: 'PDF', date: '09/03/2024', size: '2.4 MB' },
    { id: 2, name: 'Análise de Combustível', type: 'Excel', date: '09/03/2024', size: '1.2 MB' },
    { id: 3, name: 'Histórico de Viagens', type: 'PDF', date: '08/03/2024', size: '3.1 MB' },
    { id: 4, name: 'Manutenção Programada', type: 'Excel', date: '07/03/2024', size: '0.8 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Relatórios</h2>
          <p className="text-gray-600 mt-1">Gere e baixe relatórios do sistema</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <FileText size={20} />
          Novo Relatório
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
        <Filter size={18} className="text-gray-600" />
        <input
          type="text"
          placeholder="Procurar relatórios..."
          className="flex-1 outline-none text-sm"
        />
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
          <option>Todos os tipos</option>
          <option>PDF</option>
          <option>Excel</option>
        </select>
      </div>

      {/* Lista de Relatórios */}
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{report.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded font-semibold">{report.type}</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {report.date}
                  </div>
                  <span>{report.size}</span>
                </div>
              </div>
            </div>
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
