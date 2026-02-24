import { useState } from "react";
import { LayoutDashboard, BarChart3, Settings } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { icon: <LayoutDashboard />, label: "Dashboard" },
    { icon: <BarChart3 />, label: "Relatórios" },
    { icon: <Settings />, label: "Configurações" }
  ];

  return (
    <aside
      className={`bg-white shadow-xl transition-all duration-300 ${
        open ? "w-64" : "w-16"
      } min-h-screen`}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className={`text-xl font-bold text-blue-600 transition-all duration-300`}>
          {open ? "☰ Dashboard" : "☰"}
        </span>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center p-4 hover:bg-blue-50 hover:text-blue-600 cursor-pointer rounded transition-colors duration-200 mb-1"
            >
              <span className="mr-3">{item.icon}</span>
              {open && <span className="font-medium">{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}