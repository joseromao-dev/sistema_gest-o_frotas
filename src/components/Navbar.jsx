import { Bell, Search, User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-black bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent leading-tight">FLEET MASTER</h1>
            <p className="text-[10px] font-bold text-blue-500/80 tracking-widest uppercase -mt-0.5">Enterprise Suite</p>
          </div>
        </div>

        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="bg-gray-50/50 border border-gray-200 text-sm rounded-xl py-2.5 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all hover:text-blue-600 relative group">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>
        </div>
        
        <div className="h-8 w-px bg-gray-100"></div>

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-none">{user?.name || 'Gestor'}</p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter mt-1">Super Administrador</p>
          </div>
          
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-105 overflow-hidden ring-2 ring-white">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold uppercase">{user?.name?.charAt(0) || 'A'}</span>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
