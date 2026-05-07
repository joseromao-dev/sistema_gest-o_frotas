import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const name = role === 'admin' ? 'Administrador' : role === 'secretary' ? 'Secretária' : 'Professor';
      login({ email, name, role });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-[1000px] grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 overflow-hidden relative z-10 border border-slate-100">
        {/* Left Side - Visual */}
        <div className="hidden md:flex flex-col justify-between bg-slate-900 p-12 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                EG
              </div>
              <h1 className="text-2xl font-bold tracking-tight">EduGest</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold leading-tight">
                A próxima geração da <span className="text-primary">gestão escolar</span> começa aqui.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Simplifique a administração, potencie o ensino e transforme a experiência educativa da sua instituição.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              'Interface intuitiva e moderna',
              'Relatórios em tempo real',
              'Gestão académica completa'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <CheckCircle2 className="text-primary h-5 w-5" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 md:hidden flex flex-col items-center text-center">
            <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 mb-4">
              EG
            </div>
            <h1 className="text-2xl font-bold text-slate-900">EduGest</h1>
          </div>

          <div className="mb-8">
            <h3 className="text-3xl font-black text-slate-900 mb-2">Bem-vindo</h3>
            <p className="text-slate-500 font-medium">Introduza as suas credenciais para aceder.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-slate-900 font-medium"
                  placeholder="exemplo@edugest.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Palavra-passe</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">Esqueceu-se?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all text-slate-900 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Perfil de Acesso</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'admin', label: 'Admin' },
                  { id: 'secretary', label: 'Secretaria' },
                  { id: 'teacher', label: 'Professor' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setRole(p.id)}
                    className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      role === p.id 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Entrar no Sistema
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400 font-medium italic">
              "A educação é a arma mais poderosa que podes usar para mudar o mundo."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
