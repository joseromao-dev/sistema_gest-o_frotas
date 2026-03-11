import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Truck, Users, Navigation, Fuel, Wrench, FileText, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Truck size={20} />, label: 'Veículos', path: '/veiculos' },
    { icon: <Users size={20} />, label: 'Motoristas', path: '/motoristas' },
    { icon: <Navigation size={20} />, label: 'Viagens', path: '/viagens' },
    { icon: <Fuel size={20} />, label: 'Combustível', path: '/combustivel' },
    { icon: <Wrench size={20} />, label: 'Manutenção', path: '/manutencao' },
    { icon: <FileText size={20} />, label: 'Relatórios', path: '/relatorios' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Container Principal com Sidebar + Conteúdo */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-white via-gray-50 to-white shadow-xl transition-all duration-300 ease-in-out border-r border-blue-100 flex flex-col overflow-y-auto`}>
          <div className="p-4 border-b border-blue-100 flex items-center justify-between sticky top-0 bg-gradient-to-r from-white to-gray-50">
            <h2 className={`${!isSidebarOpen && 'hidden'} font-bold text-sm text-blue-900 uppercase tracking-widest`}>Menu</h2>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-blue-100 rounded-lg transition-all hover:scale-110 text-gray-700">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 mt-6 px-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center p-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 rounded-xl transition-all group hover:shadow-md hover:scale-105 transform duration-200"
              >
                <div className="flex items-center min-w-[24px] justify-center group-hover:scale-125 transition-transform">
                  {item.icon}
                </div>
                <span className={`${!isSidebarOpen && 'hidden'} ml-4 font-semibold text-sm`}>{item.label}</span>
                <div className={`${!isSidebarOpen && 'hidden'} ml-auto h-1 w-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-blue-100 sticky bottom-0 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className={`${!isSidebarOpen && 'hidden'} mb-4 px-2`}>
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@sistema.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full justify-center p-3 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl transition-all text-sm font-semibold hover:shadow-md hover:scale-105 transform duration-200"
            >
              <span className={`${!isSidebarOpen && 'hidden'}`}>Sair</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
