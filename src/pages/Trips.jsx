import { Navigation, Plus, MapPin, Calendar, Fuel, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Trips = () => {
  const { trips, addTrip, deleteTrip } = useFleet();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const [formData, setFormData] = useState({
    motorista: '',
    veiculo: '',
    origem: '',
    destino: '',
    km: '',
    combustivel: '',
    data: new Date().toISOString().split('T')[0]
  });

  const filteredTrips = trips.filter(trip => {
    return trip.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
           trip.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
           trip.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
           trip.destino.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenModal = () => {
    setFormData({
      motorista: '',
      veiculo: '',
      origem: '',
      destino: '',
      km: '',
      combustivel: '',
      data: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.motorista.trim() || !formData.veiculo.trim() || !formData.origem.trim() ||
        !formData.destino.trim() || !formData.km.trim() || !formData.combustivel.trim()) {
      setToast({ message: 'Por favor, preencha todos os campos', type: 'error' });
      return;
    }

    addTrip(formData);
    setToast({ message: 'Viagem registrada com sucesso!', type: 'success' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const trip = trips.find(t => t.id === id);
    setConfirmDialog({
      isOpen: true,
      title: 'Deletar Viagem',
      message: `Tem certeza que deseja deletar a viagem de ${trip.motorista}?`,
      onConfirm: () => {
        deleteTrip(id);
        setToast({ message: 'Viagem deletada com sucesso!', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Viagens</h2>
          <p className="text-gray-600 mt-1">Histórico e rastreamento de viagens ({filteredTrips.length})</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus size={20} />
          Registrar Viagem
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar motorista, veículo, origem ou destino..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tabela de Viagens */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Motorista</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Veículo</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Origem</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Destino</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Distância</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Combustível</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Data</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-sm font-semibold text-gray-900">{trip.motorista}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-700">{trip.veiculo}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin size={14} className="text-blue-600" />
                      {trip.origem}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin size={14} className="text-red-600" />
                      {trip.destino}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-gray-900 bg-blue-50 px-3 py-1 rounded-lg inline-block">
                      {trip.km}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <Fuel size={14} className="text-yellow-600" />
                      {trip.combustivel}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar size={14} className="text-gray-400" />
                      {trip.data}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                    >
                      <Trash2 size={16} />
                    </button>
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
        title="Registrar Nova Viagem"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Motorista</label>
              <input
                type="text"
                value={formData.motorista}
                onChange={(e) => setFormData({ ...formData, motorista: e.target.value })}
                placeholder="Ex: João Pereira"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Veículo</label>
              <input
                type="text"
                value={formData.veiculo}
                onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
                placeholder="Ex: Mercedes Sprinter"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Origem</label>
              <input
                type="text"
                value={formData.origem}
                onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                placeholder="Ex: Centro Luanda"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Destino</label>
              <input
                type="text"
                value={formData.destino}
                onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                placeholder="Ex: Viana"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Distância</label>
              <input
                type="text"
                value={formData.km}
                onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                placeholder="Ex: 22 km"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Combustível</label>
              <input
                type="text"
                value={formData.combustivel}
                onChange={(e) => setFormData({ ...formData, combustivel: e.target.value })}
                placeholder="Ex: 15 L"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Data</label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
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
              Registrar Viagem
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

export default Trips;
