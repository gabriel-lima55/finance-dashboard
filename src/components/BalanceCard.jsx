export default function BalanceCard({ daily, monthly, yearly }) {
  const cards = [
    { label: "Saldo do Dia", value: daily },
    { label: "Saldo do Mês", value: monthly },
    { label: "Saldo do Ano", value: yearly }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
        >
          <h4 className="text-gray-500 mb-2">{c.label}</h4>
          <p className="text-2xl font-bold text-blue-600">R$ {Number(c.value).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}