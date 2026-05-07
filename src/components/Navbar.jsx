import { LogOut, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200 px-8 py-3 flex items-center justify-between sticky top-0 z-50 h-20 shadow-sm">
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Procurar no sistema..." 
            className="pl-10 bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-primary/60 transition-all rounded-2xl h-11"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </Button>

        <div className="w-px h-6 bg-slate-200 mx-2"></div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="gap-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl px-4 py-2 transition-all font-semibold"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
