import ProfilePage from './pages/Profile/ProfilePage';
import SecuritePage from './pages/Securite/SecuritePage';
import StagePage from './pages/Stage/StagePage';
import PersonelPage from './pages/Rh/Personel'
import AchatsPage from './pages/Achats/AchatsPage';
import RapportPage from './pages/Rh/Rapport';
import TachesPage from './pages/Rh/tache_mission';
import ExamPlaningPage from './pages/ExamPlaning/ExamPlaningPage';
import RhPage from './pages/Rh/RhPage';
import ConcoursPage from './pages/Concours/ConcoursPage';
import CongePage from './pages/Rh/conge'
import Charte_graphiquePage from './pages/Charte_Graphique/charte'
import PromotionPage from "./pages/Rh/Promotion/PromotionPage" 
import DashboardLayoutBasic from './components/DashboardLayoutBasic'
import { Route, Routes } from 'react-router-dom';
//import PromotionPage from './pages/Rh/conge';


function App() {
  return (
    <Routes>
    <Route path="/" element={<DashboardLayoutBasic />}>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="securite" element={<SecuritePage />} />
      <Route path="stage" element={<StagePage />} />
      <Route path="achats" element={<AchatsPage />} />
      <Route path="examplaning" element={<ExamPlaningPage />} />
      <Route path="rh/dashboard" element={<RhPage />} />
      <Route path="rh/Personel" element={<PersonelPage />} />
      <Route path="rh/Rapports" element={<RapportPage />} />
      <Route path="/rh/taches" element={<TachesPage />} />
      <Route path="/rh/Conges" element={<CongePage />} />
      <Route path="/rh/promotion/*" element={<PromotionPage />} />
      <Route path="concours" element={<ConcoursPage />} />
      <Route path="charte_graphique" element={<Charte_graphiquePage />} />
    </Route>
  </Routes>
  )
}

export default App;