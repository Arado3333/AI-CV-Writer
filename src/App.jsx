import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayoutBranding from './components/DashboardSidebarAccountFooter';
import Home from './pages/Home';
import Map from './pages/map'; 
import Chat from './pages/chat'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<DashboardLayoutBranding />}>
          <Route path="home" element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;