import { Truck, Users, AlertCircle, Fuel, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useFleet } from '../context/FleetContext';
import StatCard from '../components/StatCard';
import VehiclesList from '../components/VehiclesList';
import DriversList from '../components/DriversList';
import MaintenancePanel from '../components/MaintenancePanel';
import FuelPanel from '../components/FuelPanel';
import RecentTripsTable from '../components/RecentTripsTable';
import MapTracker from '../components/MapTracker';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Dashboard = () => {
  const { vehicles, drivers, maintenances, trips, addTrip } = useFleet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    motorista: '',
    veiculo: '',
    origem: '',
    destino: '',
    km: '',
    combustivel: '',
    data: new Date().toISOString().split('T')[0]
  });

  const handleDownloadReport = () => {
    setToast({ message: 'Relatório gerado e baixado com sucesso!', type: 'success' });
  };

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

  // Calcular estatísticas dinamicamente
  const stats = useMemo(() => {
    const activeVehicles = vehicles.filter(v => v.status === 'Ativo').length;
    const activeDrivers = drivers.filter(d => d.status === 'Disponível').length;
    const pendingMaintenance = maintenances.filter(m => m.status === 'Pendente').length;

    return [
      { 
        label: 'Veículos na Frota', 
        value: vehicles.length.toString(), 
        icon: <Truck size={24} className="text-blue-600" />, 
        color: 'bg-blue-50' 
      },
      { 
        label: 'Motoristas Online', 
        value: activeDrivers.toString(), 
        icon: <Users size={24} className="text-emerald-600" />, 
        color: 'bg-emerald-50' 
      },
      { 
        label: 'Manutenções em Dia', 
        value: pendingMaintenance.toString(), 
        icon: <AlertCircle size={24} className="text-amber-600" />, 
        color: 'bg-amber-50' 
      },
      { 
        label: 'Consumo Mensal', 
        value: '1.250L', 
        icon: <Fuel size={24} className="text-rose-600" />, 
        color: 'bg-rose-50' 
      },
    ];
  }, [vehicles, drivers, maintenances]);

  const recentTrips = useMemo(() => trips.slice(0, 5), [trips]);
  const recentMaintenances = useMemo(() => maintenances.slice(0, 3), [maintenances]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Visão geral do sistema em tempo real
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadReport}
            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            Baixar Relatório
          </button>
          <button 
            onClick={handleOpenModal}
            className="px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group"
          >
            <Plus size={18} className="transition-transform group-hover:rotate-90" />
            Nova Viagem
          </button>
        </div>
      </div>

      {/* Modal de Nova Viagem */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nova Viagem"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Motorista</label>
              <select
                value={formData.motorista}
                onChange={(e) => setFormData({ ...formData, motorista: e.target.value })}
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 cursor-pointer"
              >
                <option value="">Selecionar Motorista</option>
                {drivers.map(d => <option key={d.id} value={d.nome}>{d.nome}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Veículo</label>
              <select
                value={formData.veiculo}
                onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 cursor-pointer"
              >
                <option value="">Selecionar Veículo</option>
                {vehicles.map(v => <option key={v.id} value={v.modelo}>{v.placa} - {v.modelo}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Origem</label>
              <input
                type="text"
                value={formData.origem}
                onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                placeholder="Ex: Centro Luanda"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destino</label>
              <input
                type="text"
                value={formData.destino}
                onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                placeholder="Ex: Viana"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Distância</label>
              <input
                type="text"
                value={formData.km}
                onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                placeholder="Ex: 22 km"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Combustível</label>
              <input
                type="text"
                value={formData.combustivel}
                onChange={(e) => setFormData({ ...formData, combustivel: e.target.value })}
                placeholder="Ex: 15 L"
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Data</label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-50">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-8 py-4 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all uppercase text-xs tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase text-xs tracking-widest"
            >
              Registrar Viagem
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast de Notificação */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatCard 
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Mapa de Rastreamento - Agora maior e com destaque */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900">Rastreamento em Tempo Real</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">Localização atual da frota ativa</p>
              </div>
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-50 flex items-center justify-center text-blue-600 text-[10px] font-black">
                  +12
                </div>
              </div>
            </div>
            <div className="h-[500px] relative">
              <MapTracker />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MaintenancePanel maintenances={recentMaintenances} />
            <FuelPanel monthlyConsumption="1,250 L" monthlyCost="Kz 250,000" />
          </div>
        </div>

        {/* Sidebar de conteúdo no Dashboard */}
        <div className="space-y-8">
          <VehiclesList vehicles={vehicles.slice(0, 4)} />
          <DriversList drivers={drivers.slice(0, 6)} />
        </div>
      </div>

      {/* Tabela de Viagens - Ocupando toda a largura no final */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-gray-900">Atividade Recente</h3>
            <p className="text-sm text-gray-500 mt-1 font-medium">Últimas 5 viagens realizadas</p>
          </div>
          <button className="text-blue-600 font-bold text-sm hover:underline">Ver todas</button>
        </div>
        <RecentTripsTable trips={recentTrips} />
      </div>
    </div>
  );
};

export default Dashboard;
