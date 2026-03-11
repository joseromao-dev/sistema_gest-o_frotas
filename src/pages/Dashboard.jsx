import { Truck, Users, AlertCircle, Fuel } from 'lucide-react';
import { useMemo } from 'react';
import { useFleet } from '../context/FleetContext';
import StatCard from '../components/StatCard';
import VehiclesList from '../components/VehiclesList';
import DriversList from '../components/DriversList';
import MaintenancePanel from '../components/MaintenancePanel';
import FuelPanel from '../components/FuelPanel';
import RecentTripsTable from '../components/RecentTripsTable';
import MapTracker from '../components/MapTracker';

const Dashboard = () => {
  const { vehicles, drivers, maintenances, trips } = useFleet();

  // Calcular estatísticas dinamicamente
  const stats = useMemo(() => {
    const activeVehicles = vehicles.filter(v => v.status === 'Ativo').length;
    const activeDrivers = drivers.filter(d => d.status === 'Disponível').length;
    const pendingMaintenance = maintenances.filter(m => m.status === 'Pendente').length;

    return [
      { 
        label: 'Total de Veículos', 
        value: vehicles.length.toString(), 
        icon: <Truck className="text-blue-600" />, 
        color: 'bg-blue-100' 
      },
      { 
        label: 'Motoristas Disponiveis', 
        value: activeDrivers.toString(), 
        icon: <Users className="text-green-600" />, 
        color: 'bg-green-100' 
      },
      { 
        label: 'Manutenção Pendente', 
        value: pendingMaintenance.toString(), 
        icon: <AlertCircle className="text-orange-600" />, 
        color: 'bg-orange-100' 
      },
      { 
        label: 'Consumo do Mês', 
        value: '1,250 L', 
        icon: <Fuel className="text-yellow-600" />, 
        color: 'bg-yellow-100' 
      },
    ];
  }, [vehicles, drivers, maintenances]);

  const recentTrips = useMemo(() => trips.slice(0, 5), [trips]);
  const recentMaintenances = useMemo(() => maintenances.slice(0, 3), [maintenances]);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Bem-vindo ao Sistema de Gestão de Frota</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Mapa de Rastreamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MapTracker />
      </div>

      {/* Veículos e Motoristas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehiclesList vehicles={vehicles.slice(0, 3)} />
        <DriversList drivers={drivers.slice(0, 5)} />
      </div>

      {/* Manutenção e Combustível */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MaintenancePanel maintenances={recentMaintenances} />
        <FuelPanel monthlyConsumption="1,250 L" monthlyCost="Kz 250,000" />
      </div>

      {/* Tabela de Viagens */}
      <RecentTripsTable trips={recentTrips} />
    </div>
  );
};

export default Dashboard;
