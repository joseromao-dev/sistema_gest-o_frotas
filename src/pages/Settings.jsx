const Settings = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Configurações do Sistema</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Empresa</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Fera Alda Gestão"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email de Suporte</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="suporte@feraalda.com"
            />
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
