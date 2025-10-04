import { useState } from "react";

import Demographic from "./pages/Demographic";
import DigitalSustainabilityRole from "./pages/DigitalSustainabilityRole";
import GeneralAwareness from "./pages/GeneralAwareness";
import SustainabilityTasks from "./pages/SustainabilityTasks";
import "./index.css";

const navigationSections = [
  { id: "demographic", label: "Demographic", component: Demographic },
  {
    id: "general-awareness",
    label: "General Awareness of Sustainability",
    component: GeneralAwareness,
  },
  {
    id: "digital-sustainability-role",
    label: "The Role of Digital Sustainability in Your Organization",
    component: DigitalSustainabilityRole,
  },
  {
    id: "sustainability-tasks",
    label: "Sustainability in Your Job and Tasks",
    component: SustainabilityTasks,
  },
] as const;

type SectionId = (typeof navigationSections)[number]["id"];

function App() {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(
    navigationSections[0].id
  );

  const activeSection = navigationSections.find(
    (section) => section.id === activeSectionId
  );

  const ActiveSectionComponent = activeSection?.component ?? (() => null);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="flex w-64 flex-col border-r border-white/10 bg-slate-900/70 px-6 py-6">
        <div className="text-lg font-semibold tracking-tight">
          Sustainability Survey
        </div>
        <nav className="mt-6">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {navigationSections.map((section) => {
              const isActive = section.id === activeSectionId;

              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => setActiveSectionId(section.id)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition ${
                      isActive
                        ? "bg-slate-800/80 text-white"
                        : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
                    }`}
                  >
                    <span className="pr-2 leading-snug">{section.label}</span>
                    <span
                      className={`text-xs ${
                        isActive ? "text-white" : "text-slate-500"
                      }`}
                    >
                      ›
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex flex-1 flex-col p-10">
        <div className="w-full rounded-lg border border-dashed border-slate-700 bg-slate-900/30 px-10 py-12">
          <ActiveSectionComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
