import { Plus, Search, Mail, Phone, BookOpen, Filter, Download, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardFooter } from '../components/ui/card';

const Teachers = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    status: 'Ativo',
    classes: '',
    email: '',
    phone: '',
  });
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const filteredTeachers = teachers.filter((teacher) => {
    const value = `${teacher.name} ${teacher.subject} ${teacher.status}`.toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  const handleOpenModal = (teacher = null) => {
    if (teacher) {
      setEditingId(teacher.id);
      setFormData({
        name: teacher.name,
        subject: teacher.subject,
        status: teacher.status,
        classes: teacher.classes.join(', '),
        email: teacher.email,
        phone: teacher.phone,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        subject: '',
        status: 'Ativo',
        classes: '',
        email: '',
        phone: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.subject.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setToast({ message: 'Preencha todos os campos obrigatórios.', type: 'error' });
      return;
    }

    const teacherPayload = {
      name: formData.name,
      subject: formData.subject,
      status: formData.status,
      classes: formData.classes.split(',').map((value) => value.trim()).filter(Boolean),
      email: formData.email,
      phone: formData.phone,
    };

    if (editingId) {
      updateTeacher(editingId, teacherPayload);
      setToast({ message: 'Professor atualizado com sucesso!', type: 'success' });
    } else {
      addTeacher(teacherPayload);
      setToast({ message: 'Professor adicionado com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const teacher = teachers.find((item) => item.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Professor',
      message: `Tem certeza que deseja remover ${teacher?.name} do corpo docente?`,
      onConfirm: () => {
        deleteTeacher(id);
        setToast({ message: 'Professor removido com sucesso.', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true,
    });
  };

  const getStatusClass = (status) =>
    status === 'Ativo'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-slate-100 text-slate-600';

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-slate-900">Corpo Docente</h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Gestão simples e objetiva dos professores e suas disciplinas.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="rounded-2xl gap-2 h-11 px-4">
            <Download size={18} />
            Exportar
          </Button>
          <Button onClick={() => handleOpenModal()} className="rounded-2xl gap-2 h-11 px-4">
            <Plus size={18} />
            Adicionar
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Pesquisar por nome, disciplina ou turma..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-11 rounded-2xl border border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <Button variant="outline" className="rounded-2xl h-11 px-5 gap-2 border-slate-200 text-slate-600">
              <Filter size={18} />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 font-semibold">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{teacher.name}</h3>
                    <Badge variant="outline" className="rounded-full bg-slate-100 text-slate-600 border-slate-200 px-3 py-1 text-[11px]">
                      {teacher.subject}
                    </Badge>
                  </div>
                </div>
                <Badge className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] border-none ${getStatusClass(teacher.status)}`}>
                  {teacher.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-3 text-slate-600">
                  <BookOpen size={16} />
                  <span className="text-sm font-medium">
                    Turmas: <span className="text-slate-900 font-semibold">{teacher.classes.join(', ')}</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-3 text-slate-600">
                    <Mail size={16} />
                    <span className="text-sm font-medium truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-3 text-slate-600">
                    <Phone size={16} />
                    <span className="text-sm font-medium">{teacher.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 bg-slate-50 border-t border-slate-200/70 justify-between gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenModal(teacher)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <Edit2 className="inline-block mr-1" size={14} />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(teacher.id)}
                  className="rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition"
                >
                  <Trash2 className="inline-block mr-1" size={14} />
                  Excluir
                </button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-2xl px-3 text-xs">
                  Ver Perfil
                </Button>
                <Button variant="outline" size="sm" className="rounded-2xl px-3 text-xs">
                  Atribuir Turma
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Professor' : 'Adicionar Professor'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Nome</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Ana Costa"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Disciplina</label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Ex: Matemática"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ex: ana.costa@escola.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Telefone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ex: +244 923 123 456"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Turmas</label>
              <Input
                value={formData.classes}
                onChange={(e) => setFormData({ ...formData, classes: e.target.value })}
                placeholder="Ex: 10A, 11B"
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
              {editingId ? 'Salvar Alterações' : 'Adicionar Professor'}
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

export default Teachers;
