// Goals.jsx
import { deleteGoal } from "../api";

export default function Goals({ data, reloadData }) {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Goals</h2>
      <ul className="space-y-2">
        {data.map(g => (
          <li key={g.id} className="flex justify-between items-center p-2 border-b">
            <span>{g.title} - {g.target_amount} até {g.deadline}</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={async () => { await deleteGoal(g.id); reloadData(); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}