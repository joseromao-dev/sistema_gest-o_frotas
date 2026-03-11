import { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import Toast from '../components/Toast';

const Users = () => {
  const [toast, setToast] = useState(null);
  const users = [
    { id: 1, name: 'Alice Silva', email: 'alice@example.com', role: 'Admin', status: 'Ativo' },
    { id: 2, name: 'Bob Oliveira', email: 'bob@example.com', role: 'Editor', status: 'Ativo' },
    { id: 3, name: 'Carol Santos', email: 'carol@example.com', role: 'User', status: 'Inativo' },
    { id: 4, name: 'David Costa', email: 'david@example.com', role: 'User', status: 'Ativo' },
  ];

  const handleEditUser = (name) => {
    setToast({ message: `Editando perfil de ${name}...`, type: 'success' });
  };

  const handleAddUser = () => {
    setToast({ message: 'Abrindo formulário de novo usuário...', type: 'success' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Usuários</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Controle de acesso e permissões ({users.length} usuários)
          </p>
        </div>
        <button 
          onClick={handleAddUser}
          className="px-6 py-3 bg-blue-600 rounded-2xl text-sm font-black text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
        >
          <UserPlus size={20} className="transition-transform group-hover:scale-110" />
          ADICIONAR NOVO USUÁRIO
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Identidade do Usuário</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nível de Acesso</th>
                <th className="py-6 px-8 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status da Conta</th>
                <th className="py-6 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Gestão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-black text-gray-900">{user.name}</p>
                        <p className="text-xs font-bold text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="bg-gray-50 text-gray-700 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Ativo' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-[11px] font-black uppercase tracking-tighter ${
                        user.status === 'Ativo' ? 'text-emerald-600' : 'text-gray-400'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <button 
                      onClick={() => handleEditUser(user.name)}
                      className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                    >
                      Editar Perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Users;
