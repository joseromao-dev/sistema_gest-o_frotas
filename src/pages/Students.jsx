import { Plus, Search, Filter, Download, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Card, CardContent } from '../components/ui/card';

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    class: '',
    year: '2026',
    status: 'Ativo',
    guardian: '',
  });
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const filteredStudents = students.filter((student) => {
    const value = `${student.name} ${student.studentId} ${student.class}`.toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  const handleOpenModal = (student = null) => {
    if (student) {
      setEditingId(student.id);
      setFormData({ ...student });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        studentId: '',
        class: '',
        year: '2026',
        status: 'Ativo',
        guardian: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.studentId.trim() || !formData.class.trim() || !formData.guardian.trim()) {
      setToast({ message: 'Preencha todos os campos obrigatórios.', type: 'error' });
      return;
    }

    if (editingId) {
      updateStudent(editingId, formData);
      setToast({ message: 'Aluno atualizado com sucesso!', type: 'success' });
    } else {
      addStudent(formData);
      setToast({ message: 'Aluno adicionado com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const student = students.find((item) => item.id === id);

    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Aluno',
      message: `Deseja realmente remover ${student?.name}? Essa ação não pode ser desfeita.`,
      onConfirm: () => {
        deleteStudent(id);
        setToast({ message: 'Aluno removido com sucesso.', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true,
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestão de Alunos</h2>
          <p className="text-muted-foreground">
            Gerencie as informações, turmas e históricos dos seus alunos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-semibold">
            <Download size={18} />
            Exportar
          </Button>
          <Button
            onClick={() => handleOpenModal()}
            className="rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Adicionar Aluno
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Pesquisar por nome, turma ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-transparent focus-visible:bg-white transition-all rounded-xl"
              />
            </div>
            <Button variant="outline" className="rounded-xl h-11 px-5 gap-2 border-slate-200 text-slate-600">
              <Filter size={18} />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl shadow-slate-200/20 rounded-3xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-[300px] font-bold text-slate-900 px-6 py-4">Aluno</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Turma</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Ano Letivo</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Estado</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Encarregado</TableHead>
              <TableHead className="text-right px-6 py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="group hover:bg-slate-50/80 border-slate-50 transition-colors">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{student.name}</div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{student.studentId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 font-semibold text-slate-600">{student.class}</TableCell>
                <TableCell className="px-6 py-4 font-semibold text-slate-600">{student.year}</TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    variant={student.status === 'Ativo' ? 'success' : 'secondary'}
                    className={`rounded-lg px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider border-none ${
                      student.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-slate-600 font-medium">{student.guardian}</TableCell>
                <TableCell className="px-6 py-4 text-right flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(student)}
                    className="px-3 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition"
                  >
                    <Edit2 className="inline-block mr-1" size={14} />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                    className="px-3 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-100 transition"
                  >
                    <Trash2 className="inline-block mr-1" size={14} />
                    Excluir
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Aluno' : 'Adicionar Aluno'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Nome do aluno</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Pedro Gomes"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">ID do aluno</label>
              <Input
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="Ex: AL-105"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Turma</label>
              <Input
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                placeholder="Ex: 10A"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Ano letivo</label>
              <Input
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Encarregado</label>
            <Input
              value={formData.guardian}
              onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
              placeholder="Ex: Marta Gomes"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto px-5 py-3 border border-slate-300 text-slate-700 rounded-2xl font-semibold hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-700 transition"
            >
              {editingId ? 'Salvar Alterações' : 'Adicionar Aluno'}
            </button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
          danger={confirmDialog.danger}
        />
      )}
    </div>
  );
};

export default Students;
