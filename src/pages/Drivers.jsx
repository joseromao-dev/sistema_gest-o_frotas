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
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Em Viagem':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      default:
        return 'bg-gray-50 text-gray-500 border border-gray-100';
    }
  };

  const isLicenseExpired = (date) => new Date(date) < new Date();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Motoristas</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Equipe de condução ativa ({filteredDrivers.length} motoristas)
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-blue-600 rounded-2xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
        >
          <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
          ADICIONAR MOTORISTA
        </button>
      </div>

      {/* Busca e Filtros */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center hover:shadow-xl transition-all duration-500">
        <div className="flex-1 w-full relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar por nome ou licença..."
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
          <option>Disponível</option>
          <option>Em Viagem</option>
          <option>Indisponível</option>
        </select>
      </div>

      {/* Grid de Motoristas Moderno */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group relative flex flex-col items-center text-center">
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(driver.status)}`}>
                {driver.status}
              </span>
            </div>

            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                {driver.nome.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl shadow-md flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${driver.status === 'Disponível' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{driver.nome}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{driver.licenseNumber}</p>

            <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Validade CNH</span>
                <div className={`flex items-center gap-1.5 text-xs font-black ${isLicenseExpired(driver.validUntil) ? 'text-rose-500' : 'text-gray-700'}`}>
                  <Calendar size={12} />
                  {driver.validUntil}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Contato</span>
                <div className="flex items-center gap-1.5 text-xs font-black text-gray-700">
                  <Phone size={12} className="text-blue-500" />
                  -- --- ----
                </div>
              </div>
            </div>

            <div className="w-full flex gap-2">
              <button
                onClick={() => handleOpenModal(driver)}
                className="flex-1 py-3 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
              >
                <Edit2 size={14} />
                Editar
              </button>
              <button
                onClick={() => handleDelete(driver.id)}
                className="p-3 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
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
