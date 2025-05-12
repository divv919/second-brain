import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import { AuthPage } from "./pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashBoardPage";
import { Navigate } from "react-router-dom";
import YoutubeLinksPage from "./pages/YoutubeLinksPage";
import OtherLinksPage from "./pages/OtherLinksPage";
import TwitterLinksPage from "./pages/TwitterLinksPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="twitter" element={<TwitterLinksPage />} />
          <Route path="youtube" element={<YoutubeLinksPage />} />
          <Route path="other" element={<OtherLinksPage />} />
          <Route path="tags/:tag" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
