import "./App.css";
import HomeLayout from "./pages/HomeLayout";
import { AuthPage } from "./pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashBoardPage";
import { Navigate } from "react-router-dom";
import YoutubeLinksPage from "./pages/YoutubeLinksPage";
import OtherLinksPage from "./pages/OtherLinksPage";
import TwitterLinksPage from "./pages/MainContent";
import SharedBrainPage from "./pages/SharedBrainPage";
import TagsPage from "./pages/TagsPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={<Navigate to="/home/dashboard" replace />}
        />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/sharedBrain/:hash" element={<SharedBrainPage />} />
        <Route path="/home/:section" element={<HomeLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
