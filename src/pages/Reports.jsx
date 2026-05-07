import { FileText, Download, Calendar, Filter, Plus } from 'lucide-react';
import { useState } from 'react';
import Toast from '../components/Toast';

const Reports = () => {
  const [toast, setToast] = useState(null);
  const reports = [
    { id: 1, name: 'Boletim Escolar', type: 'PDF', date: '10/04/2026', size: '1.8 MB' },
    { id: 2, name: 'Relatório de Desempenho', type: 'Excel', date: '08/04/2026', size: '2.1 MB' },
    { id: 3, name: 'Estado de Pagamentos', type: 'PDF', date: '07/04/2026', size: '1.3 MB' },
    { id: 4, name: 'Análise de Frequência', type: 'Excel', date: '06/04/2026', size: '1.1 MB' },
  ];

  const handleDownload = (name) => {
    setToast({ message: `O relatório "${name}" foi baixado com sucesso!`, type: 'success' });
  };

  const handleNewReport = () => {
    setToast({ message: 'Novo relatório escolar em processamento...', type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Relatórios</h2>
          <p className="text-slate-500 mt-2 max-w-2xl">Relatórios prontos para baixar ou usar em análise administrativa.</p>
        </div>
        <button
          onClick={handleNewReport}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Gerar relatório
        </button>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Filter size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Buscar relatórios por nome ou data"
              className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <select className="max-w-xs rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
            <option>Todos os formatos</option>
            <option>PDF</option>
            <option>Excel</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{report.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em]">{report.type}</span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {report.date}
                  </span>
                  <span>{report.size}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDownload(report.name)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Download size={18} />
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
