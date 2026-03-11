import { Users, Plus, Edit2, Trash2, Phone, Calendar, Search } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Drivers = () => {
  const { drivers, addDriver, updateDriver, deleteDriver } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    status: 'Disponível',
    licenseNumber: '',
    validUntil: ''
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchSearch = driver.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'Todos' || driver.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const handleOpenModal = (driver = null) => {
    if (driver) {
      setEditingId(driver.id);
      setFormData(driver);
    } else {
      setEditingId(null);
      setFormData({
        nome: '',
        status: 'Disponível',
        licenseNumber: '',
        validUntil: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome.trim() || !formData.licenseNumber.trim() || !formData.validUntil) {
      setToast({ message: 'Por favor, preencha todos os campos', type: 'error' });
      return;
    }

    if (editingId) {
      updateDriver(editingId, formData);
      setToast({ message: 'Motorista atualizado com sucesso!', type: 'success' });
    } else {
      addDriver(formData);
      setToast({ message: 'Motorista adicionado com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const driver = drivers.find(d => d.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Motorista',
      message: `Tem certeza que deseja deletar o motorista ${driver.nome}?`,
      onConfirm: () => {
        deleteDriver(id);
        setToast({ message: 'Motorista deletado com sucesso!', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800';
      case 'Em Viagem':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isLicenseExpired = (date) => new Date(date) < new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Motoristas</h2>
          <p className="text-gray-600 mt-1">Gerencie os motoristas da frota ({filteredDrivers.length})</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus size={20} />
          Adicionar Motorista
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou licença..."
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
            <option>Disponível</option>
            <option>Em Viagem</option>
            <option>Indisponível</option>
          </select>
        </div>
      </div>

      {/* Tabela de Motoristas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nome</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Licença</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Válida até</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {driver.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{driver.nome}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{driver.licenseNumber}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar size={16} className={isLicenseExpired(driver.validUntil) ? 'text-red-600' : 'text-gray-400'} />
                      <span className={isLicenseExpired(driver.validUntil) ? 'text-red-600 font-semibold' : ''}>
                        {driver.validUntil}
                        {isLicenseExpired(driver.validUntil) && ' (Expirada)'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(driver)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Motorista' : 'Adicionar Motorista'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Nome</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Carlos Mendes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Número de Licença</label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value.toUpperCase() })}
              placeholder="Ex: PG123456"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option>Disponível</option>
                <option>Em Viagem</option>
                <option>Indisponível</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Válida até</label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
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
              {editingId ? 'Atualizar' : 'Adicionar'}
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

export default Drivers;
