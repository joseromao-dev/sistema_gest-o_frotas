import { Wrench, Plus, AlertCircle, CheckCircle, Calendar, Trash2, Edit2, Search } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Maintenance = () => {
  const { maintenances, addMaintenance, updateMaintenance, deleteMaintenance } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    servico: '',
    veiculo: '',
    data: '',
    prioridade: 'Média',
    custo: '',
    status: 'Pendente'
  });

  const filteredMaintenances = maintenances.filter(m => {
    const matchSearch = m.servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.veiculo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'Todos' || m.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const handleOpenModal = (maintenance = null) => {
    if (maintenance) {
      setEditingId(maintenance.id);
      setFormData(maintenance);
    } else {
      setEditingId(null);
      setFormData({
        servico: '',
        veiculo: '',
        data: '',
        prioridade: 'Média',
        custo: '',
        status: 'Pendente'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.servico.trim() || !formData.veiculo.trim() || !formData.data || !formData.custo.trim()) {
      setToast({ message: 'Por favor, preencha todos os campos', type: 'error' });
      return;
    }

    if (editingId) {
      updateMaintenance(editingId, formData);
      setToast({ message: 'Manutenção atualizada com sucesso!', type: 'success' });
    } else {
      addMaintenance(formData);
      setToast({ message: 'Manutenção agendada com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const maintenance = maintenances.find(m => m.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Manutenção',
      message: `Tem certeza que deseja deletar a manutenção "${maintenance.servico}"?`,
      onConfirm: () => {
        deleteMaintenance(id);
        setToast({ message: 'Manutenção deletada com sucesso!', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Alta':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      case 'Média':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      default:
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pendente':
        return 'bg-orange-50 text-orange-600 border border-orange-100';
      case 'Agendada':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      default:
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Manutenção</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            Programar e acompanhar manutenções ({filteredMaintenances.length} registros)
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-blue-600 rounded-2xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
        >
          <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
          AGENDAR MANUTENÇÃO
        </button>
      </div>

      {/* Busca e Filtro Modernos */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center hover:shadow-xl transition-all duration-500">
        <div className="flex-1 w-full relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar por serviço ou veículo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium placeholder:text-gray-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-56 px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 cursor-pointer"
        >
          <option>Todos os Status</option>
          <option>Pendente</option>
          <option>Agendada</option>
          <option>Concluída</option>
        </select>
      </div>

      {/* Lista de Manutenções Modernizada */}
      <div className="grid grid-cols-1 gap-6">
        {filteredMaintenances.map((maintenance) => (
          <div key={maintenance.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <Wrench className="text-orange-600" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">{maintenance.servico}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">VEÍCULO</span>
                    <p className="text-sm font-bold text-gray-700">{maintenance.veiculo}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getPriorityColor(maintenance.prioridade)}`}>
                  Prioridade {maintenance.prioridade}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(maintenance.status)}`}>
                  {maintenance.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 pt-8 border-t border-gray-50">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Data Agendada</p>
                <div className="flex items-center gap-2 text-sm font-black text-gray-700">
                  <Calendar size={16} className="text-blue-500" />
                  {maintenance.data}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Custo Estimado</p>
                <p className="text-sm font-black text-gray-900">{maintenance.custo}</p>
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleOpenModal(maintenance)}
                  className="flex-1 md:flex-none px-6 py-3 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Edit2 size={16} />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(maintenance.id)}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Manutenção' : 'Agendar Manutenção'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Serviço</label>
            <input
              type="text"
              value={formData.servico}
              onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
              placeholder="Ex: Troca de Óleo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Veículo</label>
            <input
              type="text"
              value={formData.veiculo}
              onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
              placeholder="Ex: LD-34-RT"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Data</label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Prioridade</label>
              <select
                value={formData.prioridade}
                onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Custo</label>
              <input
                type="text"
                value={formData.custo}
                onChange={(e) => setFormData({ ...formData, custo: e.target.value })}
                placeholder="Ex: Kz 45,000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option>Pendente</option>
                <option>Agendada</option>
                <option>Concluída</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 rounded-lg transition-colors"
            >
              {editingId ? 'Atualizar' : 'Agendar'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Toasts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Dialog */}
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

export default Maintenance;
