import SustainabilityDimensions from "./SustainabilityDimensions";

const DigitalSustainabilityRole = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight text-plum-500">
        The Role of Digital Sustainability in Your Organization
      </h1>

      <div className="grid grid-cols-1 gap-6">
        <SustainabilityDimensions />
      </div>
    </div>
  );
};

export default DigitalSustainabilityRole;
