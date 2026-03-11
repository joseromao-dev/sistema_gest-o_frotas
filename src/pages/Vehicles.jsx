import { Truck, Plus, Edit2, Trash2, MapPin, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Vehicles = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    status: 'Ativo',
    year: new Date().getFullYear(),
    km: 0
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchSearch = vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'Todos' || vehicle.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const handleOpenModal = (vehicle = null) => {
    if (vehicle) {
      setEditingId(vehicle.id);
      setFormData(vehicle);
    } else {
      setEditingId(null);
      setFormData({
        placa: '',
        modelo: '',
        status: 'Ativo',
        year: new Date().getFullYear(),
        km: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.placa.trim() || !formData.modelo.trim()) {
      setToast({ message: 'Por favor, preencha todos os campos', type: 'error' });
      return;
    }

    if (editingId) {
      updateVehicle(editingId, formData);
      setToast({ message: 'Veículo atualizado com sucesso!', type: 'success' });
    } else {
      addVehicle(formData);
      setToast({ message: 'Veículo adicionado com sucesso!', type: 'success' });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const vehicle = vehicles.find(v => v.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Veículo',
      message: `Tem certeza que deseja deletar o veículo ${vehicle.placa}?`,
      onConfirm: () => {
        deleteVehicle(id);
        setToast({ message: 'Veículo deletado com sucesso!', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Em Manutenção':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Veículos</h2>
          <p className="text-gray-600 mt-1">Gerencie toda a frota de veículos ({filteredVehicles.length})</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus size={20} />
          Adicionar Veículo
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por placa ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option>Todos</option>
              <option>Ativo</option>
              <option>Em Manutenção</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Veículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Truck className="text-blue-600" size={24} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Placa</p>
              <p className="text-xl font-bold text-gray-900">{vehicle.placa}</p>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <p className="text-xs text-gray-600">Modelo</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.modelo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Ano</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Quilometragem</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.km.toLocaleString()} km</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-semibold">
                <MapPin size={16} />
                Rastrear
              </button>
              <button
                onClick={() => handleOpenModal(vehicle)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(vehicle.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Adicionar/Editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Editar Veículo' : 'Adicionar Veículo'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Placa</label>
            <input
              type="text"
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
              placeholder="Ex: LD-34-RT"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Modelo</label>
            <input
              type="text"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              placeholder="Ex: Toyota Hilux"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Ano</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Quilometragem</label>
              <input
                type="number"
                value={formData.km}
                onChange={(e) => setFormData({ ...formData, km: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option>Ativo</option>
              <option>Em Manutenção</option>
              <option>Inativo</option>
            </select>
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

export default Vehicles;
