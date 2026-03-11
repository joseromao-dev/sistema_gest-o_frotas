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
        return 'bg-red-100 text-red-800';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pendente':
        return 'bg-orange-100 text-orange-800';
      case 'Agendada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Manutenção</h2>
          <p className="text-gray-600 mt-1">Programar e acompanhar manutenções ({filteredMaintenances.length})</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus size={20} />
          Agendar Manutenção
        </button>
      </div>

      {/* Busca e Filtro */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por serviço ou veículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option>Todos</option>
            <option>Pendente</option>
            <option>Agendada</option>
            <option>Concluída</option>
          </select>
        </div>
      </div>

      {/* Lista de Manutenções */}
      <div className="space-y-4">
        {filteredMaintenances.map((maintenance) => (
          <div key={maintenance.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Wrench className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{maintenance.servico}</h3>
                  <p className="text-sm text-gray-600 mt-1">Veículo: <span className="font-semibold">{maintenance.veiculo}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(maintenance.prioridade)}`}>
                  Prioridade {maintenance.prioridade}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(maintenance.status)}`}>
                  {maintenance.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-600 font-medium">Data Agendada</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={16} className="text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">{maintenance.data}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Custo Estimado</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{maintenance.custo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Ações</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleOpenModal(maintenance)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(maintenance.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
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
