// import { Outlet } from "react-router-dom";
import { SideBar } from "../components/ui/SideBar";
import { MenuIcon } from "../icons/MenuIcon";
import MainContent from "./MainContent";
import { BrainIcon } from "../icons/BrainIcon";
import { useState } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { useNavigate } from "react-router-dom";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LinkIcon } from "../icons/LinkIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { SideBarItemMobile } from "../components/ui/SideBarItemMobile";
import { CloseIcon } from "../icons/CloseIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { enableSnackbar } = useToast();

  const handleLogout = () => {
    logout();
    enableSnackbar("Logged out successfully", "success");
    navigate("/auth");
  };
  return (
    <div className="flex ">
      <div className="hidden lg:block w-1/4 h-screen">
        <SideBar />
      </div>

      <div className="w-full">
        <div className="h-18 lg:hidden">
          <div className="lg:hidden flex justify-between bg-blue-200 fixed w-full z-1000 p-6 items-center ">
            {isSidebarOpen && (
              <div className="w-full  flex flex-col justify-center items-center   h-screen bg-blue-50 fixed z-100 top-0 left-0 gap-4">
                <div
                  className="absolute top-10 right-10 text-blue-900 cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <CloseIcon size="md" />
                </div>
                <SideBarItemMobile
                  isActive={location.pathname === "/home/dashboard"}
                  icon={<HomeIcon size="md" />}
                  title="Dashboard"
                  onClick={() => {
                    navigate("/home/dashboard");
                    setIsSidebarOpen(false);
                  }}
                />

                <SideBarItemMobile
                  isActive={location.pathname === "/home/twitter"}
                  icon={<TwitterIcon size="md" />}
                  title="Twitter"
                  onClick={() => {
                    navigate("/home/twitter");
                    setIsSidebarOpen(false);
                  }}
                />
                <SideBarItemMobile
                  isActive={location.pathname === "/home/youtube"}
                  icon={<YoutubeIcon size="md" />}
                  title="Youtube"
                  onClick={() => {
                    navigate("/home/youtube");
                    setIsSidebarOpen(false);
                  }}
                />
                <SideBarItemMobile
                  isActive={location.pathname === "/home/other"}
                  icon={<LinkIcon size="md" />}
                  title="Others"
                  onClick={() => {
                    navigate("/home/other");
                    setIsSidebarOpen(false);
                  }}
                />
                <SideBarItemMobile
                  icon={<LogoutIcon size="md" />}
                  title="Logout"
                  onClick={handleLogout}
                />
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
            <div
              className="cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MenuIcon />
            </div>
          </div>
        </div>
        <MainContent />
      </div>
    </div>
  );
}
