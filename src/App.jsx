import ProfilePage from './pages/Profile/ProfilePage';
import SecuritePage from './pages/Securite/SecuritePage';
import StagePage from './pages/Stage/StagePage';
import Personel from './pages/Rh/Personel'
import AchatsPage from './pages/Achats/AchatsPage';
import Rapport from './pages/Rh/Rapport';
import Taches from './pages/Rh/tache_mission';
import ExamPlaningPage from './pages/ExamPlaning/ExamPlaningPage';
import RhPage from './pages/Rh/RhPage';
import ConcoursPage from './pages/Concours/ConcoursPage';
import Conge from './pages/Rh/conge'

import DashboardLayoutBasic from './components/DashboardLayoutBasic'
import { Route, Routes } from 'react-router-dom';


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
      <Route path="rh/Personel" element={<Personel />} />
      <Route path="rh/Rapports" element={<Rapport />} />
      <Route path="/rh/taches" element={<Taches />} />
      <Route path="/rh/Conges" element={<Conge />} />
      <Route path="concours" element={<ConcoursPage />} />
    </Route>
  </Routes>
  )
}

export default App;
