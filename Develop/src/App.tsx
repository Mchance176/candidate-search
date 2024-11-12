import { CandidateProvider } from './context/CandidateContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';

function App() {
  return (
    <CandidateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/saved" element={<SavedCandidates />} />
        </Routes>
      </Router>
    </CandidateProvider>
  );
}

export default App;
