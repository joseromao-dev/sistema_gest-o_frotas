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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Viagens</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Histórico e rastreamento de operações ({filteredTrips.length} registros)
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 bg-blue-600 rounded-2xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
        >
          <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
          REGISTRAR VIAGEM
        </button>
      </div>

      {/* Busca Moderna */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
        <div className="relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar motorista, veículo, origem ou destino..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Tabela de Viagens Premium */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Motorista / Veículo</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Trajeto</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Distância / Consumo</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Data</th>
                <th className="py-6 px-8 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black group-hover:scale-110 transition-transform">
                        {trip.motorista.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{trip.motorista}</p>
                        <p className="text-[11px] font-bold text-gray-400 uppercase mt-0.5">{trip.veiculo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        {trip.origem}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                        {trip.destino}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-6">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">KM</p>
                        <p className="text-sm font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg inline-block">{trip.km}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">COMBUSTÍVEL</p>
                        <div className="flex items-center gap-1.5 text-sm font-black text-amber-600">
                          <Fuel size={14} />
                          {trip.combustivel}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2 text-xs font-black text-gray-500">
                      <Calendar size={14} className="text-blue-500" />
                      {trip.data}
                    </div>
                  </td>
                  <td className="py-6 px-8 text-center">
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="p-3 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
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
