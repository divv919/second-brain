import { BrainIcon } from "../../icons/BrainIcon";

const GlobalLoader = () => {
  return (
    <div className="text-blue-600 animate-pulse flex gap-3 justify-center items-center">
      <BrainIcon size="lg" />
      <div className="font-semibold text-xl text-nowrap">Loading your App</div>
    </div>
  );
};
export default GlobalLoader;
