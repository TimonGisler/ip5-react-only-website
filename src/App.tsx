import "./index.css";

const menuItems = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

function App() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="flex w-60 flex-col border-r border-white/10 bg-slate-900/70 px-6 py-5">
        <div className="text-lg font-semibold tracking-tight">Dashboard</div>
        <nav className="mt-6">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
                >
                  {item.label}
                  <span className="text-xs text-slate-500">›</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-xl rounded-lg border border-dashed border-slate-700 px-10 py-16 text-center text-sm text-slate-400">
          Content area
        </div>
      </main>
    </div>
  );
}

export default App;
