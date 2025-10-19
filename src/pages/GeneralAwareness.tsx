import DiscussionFrequency from "./general-awareness/DiscussionFrequency";

const GeneralAwareness = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight text-plum-500">
        General Awareness of Sustainability
      </h1>

      <div className="grid grid-cols-1 gap-6">
        <DiscussionFrequency />
      </div>
    </div>
  );
};

export default GeneralAwareness;
