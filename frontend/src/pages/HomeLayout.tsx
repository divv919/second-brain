import { Outlet } from "react-router-dom";
import { SideBar } from "../components/ui/SideBar";
import MainContent from "./MainContent";

export default function HomeLayout() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <SideBar />
      </div>
      <div className="w-4/5">
        <MainContent />
      </div>
    </div>
  );
}
