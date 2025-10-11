import { navigationSections, type SectionId } from "../App";

type SidebarProps = {
  activeSectionId: SectionId;
  setActiveSectionId: (id: SectionId) => void;
};

function Sidebar({ activeSectionId, setActiveSectionId }: SidebarProps) {
  return (
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
  );
}

export default Sidebar;
