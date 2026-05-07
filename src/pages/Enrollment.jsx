import { Search, FilePlus, CheckCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const Enrollment = () => {
  const { enrollments, students, addEnrollment, updateEnrollment, deleteEnrollment } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [formData, setFormData] = useState({
    studentId: students?.[0]?.id?.toString() || '',
    course: '',
    className: '',
    status: 'Pendente',
    date: '',
    confirmationNote: '',
  });

  const filteredEnrollments = enrollments.filter((item) => {
    const student = students.find((s) => s.id === item.studentId);
    const value = `${student?.name || ''} ${item.course} ${item.status}`.toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        studentId: item.studentId.toString(),
        course: item.course,
        className: item.className,
        status: item.status,
        date: item.date,
        confirmationNote: item.confirmationNote,
      });
    } else {
      setEditingId(null);
      setFormData({
        studentId: students?.[0]?.id?.toString() || '',
        course: '',
        className: '',
        status: 'Pendente',
        date: '',
        confirmationNote: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.course.trim() || !formData.className.trim() || !formData.date) {
      setToast({ message: 'Por favor, preencha todos os campos obrigatórios.', type: 'error' });
      return;
    }

    const payload = {
      studentId: parseInt(formData.studentId, 10),
      course: formData.course,
      className: formData.className,
      status: formData.status,
      date: formData.date,
      confirmationNote: formData.confirmationNote,
    };

    if (editingId) {
      updateEnrollment(editingId, payload);
      setToast({ message: 'Matrícula atualizada com sucesso!', type: 'success' });
    } else {
      addEnrollment(payload);
      setToast({ message: 'Matrícula adicionada com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const enrollment = enrollments.find((item) => item.id === id);
    const student = students.find((s) => s.id === enrollment?.studentId);

    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Matrícula',
      message: `Deseja realmente excluir a matrícula de ${student?.name || 'este aluno'} no curso ${enrollment?.course}?`,
      onConfirm: () => {
        deleteEnrollment(id);
        setToast({ message: 'Matrícula removida com sucesso.', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true,
    });
  };

  const studentName = (studentId) => students.find((s) => s.id === studentId)?.name || 'Aluno';

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Matrículas</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Gestão clara das inscrições e do status das matrículas.
          </p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="px-5 py-3 rounded-2xl text-sm font-semibold"
        >
          <FilePlus size={18} />
          Nova Matrícula
        </Button>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-6 flex items-center gap-4">
          <Search size={20} className="text-slate-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar matrícula por aluno ou curso"
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredEnrollments.map((item) => (
          <Card key={item.id} className="rounded-2xl border border-slate-200/70 bg-white shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{studentName(item.studentId)}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Curso: <span className="font-semibold text-slate-900">{item.course}</span>
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${item.status === 'Confirmada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Turma</p>
                  <p>{item.className}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Data</p>
                  <p>{item.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <CheckCircle className="text-emerald-500" />
                <span>{item.confirmationNote}</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handleOpenModal(item)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <Edit2 className="inline-block mr-1" size={14} />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition"
                >
                  <Trash2 className="inline-block mr-1" size={14} />
                  Excluir
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Matrícula' : 'Nova Matrícula'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Aluno</label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id.toString()}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Curso</label>
              <Input
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                placeholder="Ex: Ciências"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Turma</label>
              <Input
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                placeholder="Ex: 10A"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Data</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Pendente</option>
                <option>Confirmada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Confirmação</label>
              <Input
                value={formData.confirmationNote}
                onChange={(e) => setFormData({ ...formData, confirmationNote: e.target.value })}
                placeholder="Ex: Matrícula confirmada pela secretaria"
              />
            </div>
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
              {editingId ? 'Salvar Alterações' : 'Adicionar Matrícula'}
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

export default Enrollment;
