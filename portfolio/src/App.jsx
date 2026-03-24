import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProfilePage from "./pages/ProfilePage";
import RepoListPage from "./pages/RepoListPage";
import RepoDetailPage from "./pages/RepoDetailPage";
import SkillsPage from "./pages/SkillsPage";
import CertificationsPage from "./pages/CertificationsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"        element={<ProfilePage />} />
        <Route path="/repos"   element={<RepoListPage />} />
        <Route path="/skills"  element={<SkillsPage />} />
        <Route path="/certs"   element={<CertificationsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/repo/:id" element={<RepoDetailPage />} />
      </Route>
    </Routes>
  );
}
