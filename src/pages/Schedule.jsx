import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

const Schedule = () => {
  const { schedule } = useFleet();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Horários</h2>
        <p className="text-slate-500 mt-2 max-w-2xl">Agenda semanal de turmas, salas e professores com um layout claro e direto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day) => (
          <div key={day} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{day}</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Agenda</p>
              </div>
              <CalendarDays size={22} className="text-slate-500" />
            </div>
            <div className="space-y-4">
              {schedule.filter((item) => item.day === day).map((event) => (
                <div key={event.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm font-semibold text-slate-900">{event.subject}</p>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{event.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">Turma {event.className}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} /> {event.room}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} /> {event.teacher}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
