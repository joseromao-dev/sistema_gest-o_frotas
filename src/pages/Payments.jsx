import { Search, DollarSign, CheckCircle, Clock, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Payments = () => {
  const { payments, students, addPayment, updatePayment, deletePayment } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    amount: '',
    dueDate: '',
    status: 'Pendente',
    method: 'Transferência',
  });

  const filteredPayments = payments.filter((payment) => {
    const student = students.find((s) => s.id === payment.studentId);
    const value = `${student?.name || ''} ${payment.status} ${payment.amount}`.toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  const totalPaid = payments.filter((p) => p.status === 'Pago').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === 'Pendente').reduce((sum, p) => sum + p.amount, 0);

  const handleOpenModal = (payment = null) => {
    if (payment) {
      setEditingId(payment.id);
      setFormData({
        studentId: payment.studentId,
        amount: payment.amount.toString(),
        dueDate: payment.dueDate,
        status: payment.status,
        method: payment.method,
      });
    } else {
      setEditingId(null);
      setFormData({ studentId: '', amount: '', dueDate: '', status: 'Pendente', method: 'Transferência' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.amount || !formData.dueDate) {
      setToast({ message: 'Preencha aluno, valor e data de vencimento.', type: 'error' });
      return;
    }

    const paymentPayload = {
      studentId: Number(formData.studentId),
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      status: formData.status,
      method: formData.method,
    };

    if (editingId) {
      updatePayment(editingId, paymentPayload);
      setToast({ message: 'Pagamento atualizado com sucesso!', type: 'success' });
    } else {
      addPayment(paymentPayload);
      setToast({ message: 'Pagamento registado com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const payment = payments.find((item) => item.id === id);
    const student = students.find((s) => s.id === payment.studentId);
    setConfirmDialog({
      isOpen: true,
      title: 'Excluir Pagamento',
      message: `Tem certeza que deseja excluir o pagamento de ${student?.name || 'Aluno'}?`,
      onConfirm: () => {
        deletePayment(id);
        setToast({ message: 'Pagamento excluído com sucesso.', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true,
    });
  };

  const handleTogglePaid = (payment) => {
    if (payment.status !== 'Pago') {
      updatePayment(payment.id, { status: 'Pago' });
      setToast({ message: 'Pagamento marcado como pago.', type: 'success' });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Pagamentos</h2>
          <p className="text-slate-500 mt-2 max-w-2xl">Visão consolidada de receitas, propinas pagas e pagamentos pendentes.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <DollarSign size={18} />
          Registar pagamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Total pago</p>
          <p className="mt-4 text-3xl font-black text-slate-900">Kz {totalPaid.toLocaleString()}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Total pendente</p>
          <p className="mt-4 text-3xl font-black text-slate-900">Kz {totalPending.toLocaleString()}</p>
        </div>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar aluno, estado ou valor"
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filteredPayments.map((payment) => {
            const student = students.find((s) => s.id === payment.studentId);
            return (
              <div key={payment.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{student?.name || 'Aluno'}</p>
                    <p className="mt-1 text-xs text-slate-500">Vencimento: {payment.dueDate}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${payment.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {payment.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between text-slate-700">
                  <div>
                    <p className="text-lg font-black">Kz {payment.amount.toLocaleString()}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      {payment.status === 'Pago' ? <CheckCircle size={16} className="text-emerald-500" /> : <Clock size={16} className="text-amber-500" />}
                      {payment.method}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {payment.status !== 'Pago' && (
                      <button
                        onClick={() => handleTogglePaid(payment)}
                        className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                      >
                        Marcar pago
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenModal(payment)}
                      className="rounded-2xl bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                    >
                      <Edit2 size={14} /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(payment.id)}
                      className="rounded-2xl bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Pagamento' : 'Novo Pagamento'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">Aluno</label>
            <select
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Selecione um aluno</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-semibold text-slate-900">Valor</span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="75000"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-semibold text-slate-900">Data de vencimento</span>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-semibold text-slate-900">Status</span>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option>Pendente</option>
                <option>Pago</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-semibold text-slate-900">Método</span>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option>Transferência</option>
                <option>MB Way</option>
                <option>Multicaixa</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              {editingId ? 'Salvar alterações' : 'Salvar pagamento'}
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

export default Payments;
