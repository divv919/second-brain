import { BrainIcon } from "../../icons/BrainIcon";

const Fallback = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 flex flex-col items-center justify-center gap-2 ">
      <div className="p-6 rounded-full bg-gradient-to-l from-blue-50 to-white shadow-md ">
        <BrainIcon size="3xl" />
      </div>
      <div className="font-semibold text-2xl tracking-tighter">{text}</div>
    </div>
  );
};

export default Fallback;
