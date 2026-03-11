// Dados globais da aplicação - Gestão de Frota

export const fleetData = {
  // Estatísticas Gerais
  stats: {
    totalVehicles: 28,
    activeDrivers: 15,
    pendingMaintenance: 3,
    monthlyConsumption: '1,250 L',
    monthlyCost: 'Kz 250,000',
  },

  // Frota de Veículos
  vehicles: [
    { id: 1, placa: 'LD-34-RT', modelo: 'Toyota Hilux', status: 'Ativo', year: 2022, km: 15420 },
    { id: 2, placa: 'AC-21-LG', modelo: 'Mercedes Sprinter', status: 'Em Manutenção', year: 2021, km: 32150 },
    { id: 3, placa: 'BT-09-MD', modelo: 'Nissan Navara', status: 'Ativo', year: 2023, km: 8750 },
    { id: 4, placa: 'LC-15-KH', modelo: 'Volkswagen Crafter', status: 'Ativo', year: 2022, km: 22300 },
    { id: 5, placa: 'MC-08-FG', modelo: 'Scania Truck', status: 'Ativo', year: 2020, km: 45670 },
  ],

  // Motoristas
  drivers: [
    { id: 1, nome: 'Carlos Mendes', status: 'Disponível', licenseNumber: 'PG123456', validUntil: '2025-12-31' },
    { id: 2, nome: 'João Pereira', status: 'Em Viagem', licenseNumber: 'PG789012', validUntil: '2026-05-15' },
    { id: 3, nome: 'Ana Silva', status: 'Disponível', licenseNumber: 'PG345678', validUntil: '2025-08-20' },
    { id: 4, nome: 'Mário Costa', status: 'Indisponível', licenseNumber: 'PG901234', validUntil: '2024-11-10' },
    { id: 5, nome: 'Rosa Santos', status: 'Disponível', licenseNumber: 'PG567890', validUntil: '2026-03-05' },
  ],

  // Próximas Manutenções
  maintenances: [
    { id: 1, servico: 'Troca de Óleo', veiculo: 'LD-34-RT', data: '10/03/2024', prioridade: 'Alta', custo: 'Kz 45,000' },
    { id: 2, servico: 'Alinhamento', veiculo: 'AC-21-LG', data: '15/05/2024', prioridade: 'Média', custo: 'Kz 32,000' },
    { id: 3, servico: 'Revisão Completa', veiculo: 'BT-09-MD', data: '20/04/2024', prioridade: 'Alta', custo: 'Kz 120,000' },
  ],

  // Viagens Recentes
  trips: [
    { id: 1, motorista: 'João Pereira', veiculo: 'Mercedes Sprinter', origem: 'Centro Luanda', destino: 'Viana', km: '22 km', data: '09/03/2024', combustivel: '15 L' },
    { id: 2, motorista: 'Carlos Mendes', veiculo: 'Toyota Hilux', origem: 'Talatona', destino: 'Cazenga', km: '18 km', data: '09/03/2024', combustivel: '12 L' },
    { id: 3, motorista: 'Ana Silva', veiculo: 'Nissan Navara', origem: 'Benguela', destino: 'Lobito', km: '45 km', data: '08/03/2024', combustivel: '28 L' },
  ],

  // Consumo de Combustível
  fuelConsumption: [
    { data: '01/03/2024', consumo: 45, custo: 9000 },
    { data: '02/03/2024', consumo: 52, custo: 10400 },
    { data: '03/03/2024', consumo: 38, custo: 7600 },
    { data: '04/03/2024', consumo: 61, custo: 12200 },
    { data: '05/03/2024', consumo: 55, custo: 11000 },
    { data: '06/03/2024', consumo: 48, custo: 9600 },
    { data: '07/03/2024', consumo: 51, custo: 10200 },
  ],
};

export default fleetData;
