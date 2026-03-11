const Users = () => {
  const users = [
    { id: 1, name: 'Alice Silva', email: 'alice@example.com', role: 'Admin', status: 'Ativo' },
    { id: 2, name: 'Bob Oliveira', email: 'bob@example.com', role: 'Editor', status: 'Ativo' },
    { id: 3, name: 'Carol Santos', email: 'carol@example.com', role: 'User', status: 'Inativo' },
    { id: 4, name: 'David Costa', email: 'david@example.com', role: 'User', status: 'Ativo' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Gerenciamento de Usuários</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nome</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Perfil</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
