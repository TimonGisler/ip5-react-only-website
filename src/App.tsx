import { useState } from "react";

import Demographic from "./pages/demographic/Demographic";
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
    <div className="flex min-h-screen bg-transparent text-ink-900">
      <aside className="flex w-72 flex-col gap-6 rounded-r-3xl border-r border-plum-200/60 bg-lavender-100 px-8 py-8 shadow-card">
        <div className="text-lg font-semibold tracking-tight text-plum-600">
          Sustainability Survey
        </div>
        <nav className="mt-6">
          <ul className="flex flex-col gap-2 text-sm font-medium text-ink-700">
            {navigationSections.map((section) => {
              const isActive = section.id === activeSectionId;

              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => setActiveSectionId(section.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-400/50 ${
                      isActive
                        ? "bg-plum-500 text-white shadow-card"
                        : "text-ink-700 hover:bg-plum-200/30 hover:text-plum-600"
                    }`}
                  >
                    <span className="pr-2 leading-snug">{section.label}</span>
                    <span
                      className={`text-xs ${
                        isActive ? "text-white" : "text-plum-400"
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
      <main className="flex flex-1 flex-col p-12">
        <div className="w-full rounded-[var(--radius-card)] border border-plum-200/60 bg-lavender-100 px-10 py-12 shadow-card ring-1 ring-plum-200/40 backdrop-blur-sm">
          <ActiveSectionComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
