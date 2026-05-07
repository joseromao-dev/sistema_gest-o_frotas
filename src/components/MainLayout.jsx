import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Users, BookOpen, FilePlus, FileText, 
  DollarSign, CalendarDays, BarChart3, Settings, UserCog,
  ChevronRight
} from 'lucide-react';
import Navbar from './Navbar';
import { ScrollArea } from './ui/scroll-area';

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Users size={20} />, label: 'Alunos', path: '/students' },
    { icon: <BookOpen size={20} />, label: 'Professores', path: '/teachers' },
    { icon: <FilePlus size={20} />, label: 'Matrículas', path: '/enrollments' },
    { icon: <FileText size={20} />, label: 'Notas', path: '/grades' },
    { icon: <DollarSign size={20} />, label: 'Pagamentos', path: '/payments' },
    { icon: <CalendarDays size={20} />, label: 'Horário', path: '/schedule' },
    { icon: <BarChart3 size={20} />, label: 'Relatórios', path: '/reports' },
    { icon: <UserCog size={20} />, label: 'Usuários', path: '/users' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/settings' },
  ];

  const allowedPaths = {
    admin: navItems.map(item => item.path),
    secretary: ['/', '/students', '/enrollments', '/payments', '/schedule', '/reports', '/users', '/settings'],
    teacher: ['/', '/grades', '/schedule', '/students'],
  };

  const userRole = user?.role || 'admin';
  const filteredNav = navItems.filter((item) => allowedPaths[userRole]?.includes(item.path));

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
              EG
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">EduGest</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Sistema Escolar</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-1.5">
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Menu Principal</p>
            {filteredNav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 active:scale-[0.98]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="opacity-70" />}
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Administrador'}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto custom-scrollbar">
          <div className="p-6 lg:p-10">
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
