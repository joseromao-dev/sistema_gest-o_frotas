import { Search, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Toast from '../components/Toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const Grades = () => {
  const { grades, students } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);

  const filteredGrades = grades.filter((grade) => {
    const student = students.find((s) => s.id === grade.studentId);
    const value = `${student?.name || ''} ${grade.subject}`.toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Notas e Avaliações</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Registro estruturado do desempenho dos alunos.
          </p>
        </div>
        <Button
          onClick={() => setToast({ message: 'Boletim exportado com sucesso.', type: 'success' })}
          className="px-5 py-3 rounded-2xl text-sm font-semibold"
        >
          <Download size={18} />
          Exportar boletim
        </Button>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-6 flex items-center gap-4">
          <Search size={20} className="text-slate-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por aluno ou disciplina"
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGrades.map((grade) => {
          const student = students.find((s) => s.id === grade.studentId);
          const isApproved = grade.score >= 12;
          return (
            <Card key={grade.id} className="rounded-2xl border border-slate-200/70 bg-white shadow-sm">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{student?.name || 'Aluno'}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Disciplina: <span className="font-semibold text-slate-900">{grade.subject}</span>
                    </p>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {isApproved ? 'Aprovado' : 'Revisar'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-900">Nota</p>
                    <p>{grade.score.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Média</p>
                    <p>{grade.average.toFixed(1)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <FileText className="text-slate-400" />
                  <span>{grade.comment}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Grades;
