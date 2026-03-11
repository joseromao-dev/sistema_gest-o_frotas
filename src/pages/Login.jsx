import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login
    if (email && password) {
      login({ email, name: 'Admin' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl dark:shadow-black/40 w-full max-w-md border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200 dark:shadow-blue-900/20">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-50 tracking-tight">Fera Alda</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Gestão Inteligente de Frotas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Corporativo</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600"
                placeholder="exemplo@feraalda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Palavra-passe</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-blue-900/20 active:scale-95 transform"
            >
              Aceder ao Sistema
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
            © 2024 Fera Alda • Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
