const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Hoje</span>
      </div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
    </div>
  );
};

export default StatCard;
