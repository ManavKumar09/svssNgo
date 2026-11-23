import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import VolunteerPage from './pages/VolunteerPage/VolunteerPage';
import ContactPage from './pages/ContactPage/ContactPage';
import CurrentProjectsPage from './pages/CurrentProjectsPage/CurrentProjectsPage';
import CssProjectsPage from './pages/CssProjectsPage/CssProjectsPage';
import PodfProjectsPage from './pages/PodfProjectsPage/PodfProjectsPage';
import CompletedProjectsPage from './pages/CompletedProjectsPage/CompletedProjectsPage';
import ProjectCategoryPage from './pages/ProjectCategoryPage/ProjectCategoryPage';
import ChildHelpLinePage from './pages/ChildHelpLinePage/ChildHelpLinePage';
import SelfHelpGroupPage from './pages/SelfHelpGroupPage/SelfHelpGroupPage';
import ClimateChangePage from './pages/ClimateChangePage/ClimateChangePage';
import NationalHealthMissionPage from './pages/NationalHealthMissionPage/NationalHealthMissionPage';
import NhmAshaPage from './pages/NhmAshaPage/NhmAshaPage';
import TargetedInterventionPage from './pages/TargetedInterventionPage/TargetedInterventionPage';
import WorldFoodProgrammePage from './pages/WorldFoodProgrammePage/WorldFoodProgrammePage';
import AerAtmaPage from './pages/AerAtmaPage/AerAtmaPage';
import FarmerClubPromotionPage from './pages/FarmerClubPromotionPage/FarmerClubPromotionPage';
import IntegratedFarmingPage from './pages/IntegratedFarmingPage/IntegratedFarmingPage';
import EntrepreneurshipPage from './pages/EntrepreneurshipPage/EntrepreneurshipPage';
import LivelihoodWaterPage from './pages/LivelihoodWaterPage/LivelihoodWaterPage';
import TotalSanitationPage from './pages/TotalSanitationPage/TotalSanitationPage';
import EnvironmentWetlandPage from './pages/EnvironmentWetlandPage/EnvironmentWetlandPage';
import TribeRootsPage from './pages/TribeRootsPage/TribeRootsPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import DocumentsPage from './pages/DocumentsPage/DocumentsPage';
import TeamPage from './pages/TeamPage/TeamPage';
import LegalPage from './pages/LegalPage/LegalPage';
import ProjectDetailPage from './pages/ProjectDetailPage/ProjectDetailPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const root = document.getElementById('root');
      if (root) root.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 100);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/volunteers" element={<VolunteerPage />} />
        <Route path="/involve" element={<VolunteerPage />} />
        <Route path="/involve-with-us" element={<VolunteerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/current-projects" element={<CurrentProjectsPage />} />
        <Route path="/current-projects/css" element={<CssProjectsPage />} />
        <Route path="/current-projects/podf" element={<PodfProjectsPage />} />
        <Route path="/current-projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/completed-projects" element={<CompletedProjectsPage />} />
        <Route path="/completed-projects/child-help-line" element={<ChildHelpLinePage />} />
        <Route path="/completed-projects/self-help-group" element={<SelfHelpGroupPage />} />
        <Route path="/completed-projects/climate-change" element={<ClimateChangePage />} />
        <Route path="/completed-projects/national-health-mission" element={<NationalHealthMissionPage />} />
        <Route path="/completed-projects/nhm-asha" element={<NhmAshaPage />} />
        <Route path="/completed-projects/targeted-intervention" element={<TargetedInterventionPage />} />
        <Route path="/completed-projects/world-food-programme" element={<WorldFoodProgrammePage />} />
        <Route path="/completed-projects/aer-atma" element={<AerAtmaPage />} />
        <Route path="/completed-projects/farmer-club" element={<FarmerClubPromotionPage />} />
        <Route path="/completed-projects/integrated-farming" element={<IntegratedFarmingPage />} />
        <Route path="/completed-projects/entrepreneurship" element={<EntrepreneurshipPage />} />
        <Route path="/completed-projects/livelihood-water" element={<LivelihoodWaterPage />} />
        <Route path="/completed-projects/total-sanitation" element={<TotalSanitationPage />} />
        <Route path="/completed-projects/environment-wetland" element={<EnvironmentWetlandPage />} />
        <Route path="/completed-projects/:categoryId" element={<ProjectCategoryPage />} />
        <Route path="/tribe-roots" element={<TribeRootsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/our-team" element={<TeamPage />} />
        <Route path="/privacy-policy" element={<LegalPage initialTab="privacy" />} />
        <Route path="/terms-conditions" element={<LegalPage initialTab="terms" />} />
        <Route path="/terms-and-conditions" element={<LegalPage initialTab="terms" />} />
        <Route path="/cookies-policy" element={<LegalPage initialTab="cookies" />} />
      </Routes>
    </Router>
  );
}

export default App;
