// import { Outlet } from "react-router-dom";
import { SideBar } from "../components/ui/SideBar";
import { MenuIcon } from "../icons/MenuIcon";
import MainContent from "./MainContent";
import { BrainIcon } from "../icons/BrainIcon";
import { useState } from "react";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex font-poppins">
      <div className="hidden lg:block w-1/5 h-screen">
        <SideBar />
      </div>

      <div className="w-full">
        <div className="h-18 lg:hidden">
          <div className="lg:hidden flex justify-between bg-blue-200 fixed w-full z-1000 p-6 items-center">
            {isSidebarOpen && (
              <div
                className="w-full h-screen bg-slate-200 fixed z-100 top-0 left-0"
                onClick={() => setIsSidebarOpen(false)}
              >
                X
              </div>
            )}
            <div className="flex gap-3 cursor-pointer text-blue-600">
              <div className="flex justify-center items-center ">
                <BrainIcon size="md" />
              </div>
              <div className="flex text-xl items-center font-extrabold tracking-tighter ">
                Second Brain
              </div>
            </div>
            <div onClick={() => setIsSidebarOpen(true)}>
              <MenuIcon />
            </div>
          </div>
        </div>
        <MainContent />
      </div>
    </div>
  );
}
