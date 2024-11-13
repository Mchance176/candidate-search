import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CandidateProvider } from './context/CandidateContext';
import Header from './components/Layout/Header';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';

function App() {
  return (
    <CandidateProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="py-6">
            <Routes>
              <Route path="/" element={<CandidateSearch />} />
              <Route path="/saved" element={<SavedCandidates />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CandidateProvider>
  );
}

export default App;
