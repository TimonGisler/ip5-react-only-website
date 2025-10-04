import "./App.css";

const menuItems = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

function App() {
  return (
    <div className="app">
      <aside className="sidebar" aria-label="Primary">
        <div className="sidebar__brand">Acme Dashboard</div>
        <nav className="sidebar__nav">
          {menuItems.map((item) => (
            <button key={item.id} className="sidebar__item" type="button">
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="content" role="main">
        <header className="content__header">
          <h1>Welcome aboard</h1>
          <p>
            The main workspace will live here. Wire up your widgets when ready.
          </p>
        </header>
        <section className="content__placeholder" aria-label="Placeholder">
          <p>
            Placeholder area · Add charts, tables, or any components you need.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
