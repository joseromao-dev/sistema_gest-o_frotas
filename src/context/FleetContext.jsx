import { createContext, useContext, useState, useCallback } from 'react';

const FleetContext = createContext();

export const FleetProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([
    { id: 1, placa: 'LD-34-RT', modelo: 'Toyota Hilux', status: 'Ativo', year: 2022, km: 15420 },
    { id: 2, placa: 'AC-21-LG', modelo: 'Mercedes Sprinter', status: 'Em Manutenção', year: 2021, km: 32150 },
    { id: 3, placa: 'BT-09-MD', modelo: 'Nissan Navara', status: 'Ativo', year: 2023, km: 8750 },
    { id: 4, placa: 'LC-15-KH', modelo: 'Volkswagen Crafter', status: 'Ativo', year: 2022, km: 22300 },
    { id: 5, placa: 'MC-08-FG', modelo: 'Scania Truck', status: 'Ativo', year: 2020, km: 45670 },
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, nome: 'Carlos Mendes', status: 'Disponível', licenseNumber: 'PG123456', validUntil: '2025-12-31' },
    { id: 2, nome: 'João Pereira', status: 'Em Viagem', licenseNumber: 'PG789012', validUntil: '2026-05-15' },
    { id: 3, nome: 'Ana Silva', status: 'Disponível', licenseNumber: 'PG345678', validUntil: '2025-08-20' },
    { id: 4, nome: 'Mário Costa', status: 'Indisponível', licenseNumber: 'PG901234', validUntil: '2024-11-10' },
    { id: 5, nome: 'Rosa Santos', status: 'Disponível', licenseNumber: 'PG567890', validUntil: '2026-03-05' },
  ]);

  const [maintenances, setMaintenances] = useState([
    { id: 1, servico: 'Troca de Óleo', veiculo: 'LD-34-RT', data: '10/03/2024', prioridade: 'Alta', custo: 'Kz 45,000', status: 'Pendente' },
    { id: 2, servico: 'Alinhamento', veiculo: 'AC-21-LG', data: '15/05/2024', prioridade: 'Média', custo: 'Kz 32,000', status: 'Pendente' },
    { id: 3, servico: 'Revisão Completa', veiculo: 'BT-09-MD', data: '20/04/2024', prioridade: 'Alta', custo: 'Kz 120,000', status: 'Agendada' },
  ]);

  const [trips, setTrips] = useState([
    { id: 1, motorista: 'João Pereira', veiculo: 'Mercedes Sprinter', origem: 'Centro Luanda', destino: 'Viana', km: '22 km', data: '09/03/2024', combustivel: '15 L' },
    { id: 2, motorista: 'Carlos Mendes', veiculo: 'Toyota Hilux', origem: 'Talatona', destino: 'Cazenga', km: '18 km', data: '09/03/2024', combustivel: '12 L' },
    { id: 3, motorista: 'Ana Silva', veiculo: 'Nissan Navara', origem: 'Benguela', destino: 'Lobito', km: '45 km', data: '08/03/2024', combustivel: '28 L' },
  ]);

  // Veículos
  const addVehicle = useCallback((vehicle) => {
    const newVehicle = {
      ...vehicle,
      id: Math.max(...vehicles.map(v => v.id), 0) + 1
    };
    setVehicles([newVehicle, ...vehicles]);
    return newVehicle;
  }, [vehicles]);

  const updateVehicle = useCallback((id, updates) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  }, [vehicles]);

  const deleteVehicle = useCallback((id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  }, [vehicles]);

  // Motoristas
  const addDriver = useCallback((driver) => {
    const newDriver = {
      ...driver,
      id: Math.max(...drivers.map(d => d.id), 0) + 1
    };
    setDrivers([newDriver, ...drivers]);
    return newDriver;
  }, [drivers]);

  const updateDriver = useCallback((id, updates) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, ...updates } : d));
  }, [drivers]);

  const deleteDriver = useCallback((id) => {
    setDrivers(drivers.filter(d => d.id !== id));
  }, [drivers]);

  // Manutenções
  const addMaintenance = useCallback((maintenance) => {
    const newMaintenance = {
      ...maintenance,
      id: Math.max(...maintenances.map(m => m.id), 0) + 1,
      status: 'Pendente'
    };
    setMaintenances([newMaintenance, ...maintenances]);
    return newMaintenance;
  }, [maintenances]);

  const updateMaintenance = useCallback((id, updates) => {
    setMaintenances(maintenances.map(m => m.id === id ? { ...m, ...updates } : m));
  }, [maintenances]);

  const deleteMaintenance = useCallback((id) => {
    setMaintenances(maintenances.filter(m => m.id !== id));
  }, [maintenances]);

  // Viagens
  const addTrip = useCallback((trip) => {
    const newTrip = {
      ...trip,
      id: Math.max(...trips.map(t => t.id), 0) + 1
    };
    setTrips([newTrip, ...trips]);
    return newTrip;
  }, [trips]);

  const deleteTrip = useCallback((id) => {
    setTrips(trips.filter(t => t.id !== id));
  }, [trips]);

  return (
    <FleetContext.Provider value={{
      vehicles, addVehicle, updateVehicle, deleteVehicle,
      drivers, addDriver, updateDriver, deleteDriver,
      maintenances, addMaintenance, updateMaintenance, deleteMaintenance,
      trips, addTrip, deleteTrip
    }}>
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => useContext(FleetContext);
