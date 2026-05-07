import { Users, BookOpen, FilePlus, DollarSign, CalendarDays, FileText, GraduationCap, ClipboardCheck, Settings, ChevronRight, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFleet } from '../context/FleetContext';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ComposedChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SectionHeader } from '../components/ui/section-header';

const Dashboard = () => {
  const { user } = useAuth();
  const { students, teachers, enrollments, payments, schedule, grades } = useFleet();

  const pendingPayments = payments.filter((payment) => payment.status === 'Pendente').length;

  const stats = [
    { label: 'Total de Alunos', value: students.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', trend: '+5.2%' },
    { label: 'Total de Professores', value: teachers.length, icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', trend: '+2.1%' },
    { label: 'Novas Matrículas', value: enrollments.length, icon: FilePlus, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', trend: '+12.5%' },
    { label: 'Pagamentos Pendentes', value: pendingPayments, icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', trend: '-3.4%' },
  ];

  const chartData = [
    { name: 'Jan', Alunos: 320, Matrículas: 42, Professores: 12 },
    { name: 'Fev', Alunos: 340, Matrículas: 52, Professores: 13 },
    { name: 'Mar', Alunos: 360, Matrículas: 65, Professores: 14 },
    { name: 'Abr', Alunos: 380, Matrículas: 72, Professores: 15 },
    { name: 'Mai', Alunos: 400, Matrículas: 81, Professores: 16 },
    { name: 'Jun', Alunos: 420, Matrículas: 95, Professores: 17 },
  ];

  return (
    <div className="space-y-10 pb-10">
      <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            title={`Olá, ${user?.name?.split(' ')[0] || 'Administrador'}! 👋`}
            description="Visão geral dos principais indicadores do sistema."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="outline" className="h-12 rounded-2xl px-5 font-semibold">
              <CalendarDays className="mr-2 h-4 w-4 text-slate-400" />
              Maio 2026
            </Button>
            <Button className="h-12 rounded-2xl bg-primary text-white px-6 font-semibold gap-2 hover:bg-primary/90">
              <TrendingUp size={18} />
              Relatório Geral
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white border ${stat.border}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                  {stat.trend}
                </Badge>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-semibold text-slate-900">{stat.value}</h2>
                <span className="text-xs font-medium text-slate-400">total</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-slate-200/60 shadow-xl shadow-slate-200/20 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 pb-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Crescimento Institucional</CardTitle>
                <CardDescription className="text-slate-500">Evolução mensal de alunos, matrículas e professores.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Alunos
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Matrículas
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-slate-400" /> Professores
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAlunos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="colorMatriculas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      padding: '12px'
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar 
                    dataKey="Alunos" 
                    fill="url(#colorAlunos)" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="Professores" 
                    fill="#64748b" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Matrículas" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                    animationDuration={2000}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border border-slate-200/70 bg-white text-slate-900 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-200/70 pb-6">
            <SectionHeader
              title="Ações Rápidas"
              description="Acesse funções importantes com clareza e rapidez."
              titleClassName="text-slate-900"
              descriptionClassName="text-slate-500"
            />
          </CardHeader>
          <CardContent className="grid gap-3 pt-6">
            {[
              { label: 'Novo Aluno', desc: 'Registar novo estudante', icon: Users, color: 'bg-blue-500' },
              { label: 'Lançar Notas', desc: 'Avaliações do período', icon: FileText, color: 'bg-amber-500' },
              { label: 'Confirmar Pagamento', desc: 'Mensalidades e taxas', icon: DollarSign, color: 'bg-emerald-500' },
              { label: 'Gerar Horário', desc: 'Calendário escolar', icon: CalendarDays, color: 'bg-indigo-500' },
            ].map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start rounded-2xl border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4 w-full text-slate-900">
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl ${action.color} text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-none mb-1">{action.label}</p>
                    <p className="text-xs text-slate-500 font-medium">{action.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
