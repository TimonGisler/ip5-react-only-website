import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Demographic from "./pages/demographic/Demographic";
import DigitalSustainabilityRole from "./pages/DigitalSustainabilityRole";
import GeneralAwareness from "./pages/GeneralAwareness";
import SustainabilityTasks from "./pages/SustainabilityTasks";
import "./index.css";

export const navigationSections = [
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

export type SectionId = (typeof navigationSections)[number]["id"];

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
      <Sidebar
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
      />
      <main className="flex flex-1 flex-col p-12">
        <div className="w-full rounded-[var(--radius-card)] border border-plum-200/60 bg-lavender-100 px-10 py-12 shadow-card ring-1 ring-plum-200/40 backdrop-blur-sm">
          <ActiveSectionComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
