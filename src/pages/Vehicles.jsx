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
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Em Manutenção':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      default:
        return 'bg-rose-50 text-rose-600 border border-rose-100';
    }
  };

  const handleTrack = (placa) => {
    setToast({ message: `Iniciando rastreamento em tempo real do veículo ${placa}...`, type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Veículos</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Gerenciamento total da frota ({filteredVehicles.length} veículos)
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-blue-600 rounded-2xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
        >
          <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
          ADICIONAR VEÍCULO
        </button>
      </div>

      {/* Filtros e Busca Modernos */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center hover:shadow-xl transition-all duration-500">
        <div className="flex-1 w-full relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar por placa ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
            <Filter size={20} />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 md:w-48 px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 appearance-none cursor-pointer"
          >
            <option>Todos os Status</option>
            <option>Ativo</option>
            <option>Em Manutenção</option>
            <option>Inativo</option>
          </select>
        </div>
      </div>

      {/* Grid de Veículos Modernizado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </div>

            <div className="mb-8">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Truck className="text-blue-600" size={32} />
              </div>
              <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Identificação</p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{vehicle.placa}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Modelo</p>
                <p className="text-sm font-black text-gray-700 truncate">{vehicle.modelo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Km Atual</p>
                <p className="text-sm font-black text-gray-700">{vehicle.km.toLocaleString()} km</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
              <button 
                onClick={() => handleTrack(vehicle.placa)}
                className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-gray-200"
              >
                <MapPin size={14} className="group-hover/btn:animate-bounce" />
                Rastrear
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(vehicle)}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
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
