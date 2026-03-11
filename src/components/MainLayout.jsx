import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Truck, Users, Navigation, Fuel, Wrench, FileText, Settings, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-white shadow-sm transition-all duration-300 ease-in-out border-r border-gray-100 flex flex-col z-40`}>
          <div className="p-6 flex items-center justify-between">
            <h2 className={`${!isSidebarOpen && 'hidden'} font-bold text-[11px] text-gray-400 uppercase tracking-[0.2em]`}>Menu Principal</h2>
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-400 hover:text-blue-600 border border-transparent hover:border-gray-100"
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`
                    flex items-center p-3.5 rounded-2xl transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}
                  `}
                >
                  <div className={`flex items-center min-w-[24px] justify-center transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span className={`${!isSidebarOpen && 'hidden'} ml-4 font-bold text-sm tracking-tight`}>{item.label}</span>
                  
                  {isActive && isSidebarOpen && (
                    <ChevronRight size={14} className="ml-auto opacity-70" />
                  )}

                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 font-bold tracking-wide">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-gray-50">
            <button
              onClick={handleLogout}
              className={`
                flex items-center w-full p-4 rounded-2xl transition-all duration-200 group
                ${isSidebarOpen ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}
              `}
            >
              <LogOut size={20} className="transition-transform group-hover:scale-110" />
              <span className={`${!isSidebarOpen && 'hidden'} ml-4 font-bold text-sm tracking-tight`}>Terminar Sessão</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-[#F8FAFC] custom-scrollbar">
          <div className="p-10">
            <div className="max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
