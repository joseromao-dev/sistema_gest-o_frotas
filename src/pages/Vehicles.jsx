import { Truck, Plus, Edit2, Trash2, Search, Filter, Download, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../components/ui/dialog';
import { Select } from '../components/ui/select';
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
      title: 'Eliminar Veículo',
      message: `Tem certeza que deseja eliminar o veículo ${vehicle.placa}?`,
      onConfirm: () => {
        deleteVehicle(id);
        setToast({ message: 'Veículo eliminado com sucesso!', type: 'success' });
        setConfirmDialog({ isOpen: false });
      },
      onCancel: () => setConfirmDialog({ isOpen: false }),
      danger: true
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Ativo':
        return <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">Ativo</Badge>;
      case 'Em Manutenção':
        return <Badge className="bg-amber-100 text-amber-700 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">Manutenção</Badge>;
      default:
        return <Badge className="bg-rose-100 text-rose-700 border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">Inativo</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Frota Escolar</h2>
          <p className="text-muted-foreground">
            Gerencie os veículos de transporte e monitore seu estado.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2 font-semibold">
            <Download size={18} />
            Relatório
          </Button>
          <Button 
            onClick={() => handleOpenModal()}
            className="rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Novo Veículo
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Pesquisar por placa ou modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-transparent focus-visible:bg-white transition-all rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl h-11 px-5 gap-2 border-slate-200 text-slate-600">
                <Filter size={18} />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl shadow-slate-200/20 rounded-3xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="font-bold text-slate-900 px-6 py-4">Placa</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Modelo</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Ano</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Km Total</TableHead>
              <TableHead className="font-bold text-slate-900 px-6 py-4">Estado</TableHead>
              <TableHead className="text-right px-6 py-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="group hover:bg-slate-50/80 border-slate-50 transition-colors">
                  <TableCell className="px-6 py-4">
                    <span className="font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm">
                      {vehicle.placa}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary/60" />
                      <span>{vehicle.modelo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-slate-500">{vehicle.year}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-slate-900">{vehicle.km.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">km</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">{getStatusBadge(vehicle.status)}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(vehicle)} className="h-9 w-9 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(vehicle.id)} className="h-9 w-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Truck size={40} className="mb-2 opacity-20" />
                    <p className="font-medium">Nenhum veículo encontrado.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <DialogHeader className="relative z-10">
              <DialogTitle className="text-2xl font-bold">{editingId ? 'Editar Veículo' : 'Novo Veículo'}</DialogTitle>
              <DialogDescription className="text-slate-400">
                Introduza as especificações técnicas para atualizar a frota.
              </DialogDescription>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-white">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Matrícula</label>
                <Input
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold tracking-wider"
                  placeholder="LD-00-00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Modelo</label>
                <Input
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-medium"
                  placeholder="Ex: Coaster"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Ano de Fabrico</label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Quilometragem</label>
                <Input
                  type="number"
                  value={formData.km}
                  onChange={(e) => setFormData({ ...formData, km: parseInt(e.target.value) })}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Estado Operacional</label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
                {['Ativo', 'Em Manutenção', 'Inativo'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                      formData.status === status 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {status === 'Em Manutenção' ? 'Manut.' : status}
                  </button>
                ))}
              </div>
            </div>
            <DialogFooter className="pt-6 gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl font-bold text-slate-500 hover:bg-slate-50">
                Cancelar
              </Button>
              <Button type="submit" className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20">
                {editingId ? 'Atualizar Dados' : 'Registar Veículo'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
