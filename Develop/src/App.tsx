import { Outlet } from 'react-router-dom';
import { CandidateProvider } from './context/CandidateContext';
import Header from './components/Layout/Header';

function App() {
  return (
    <CandidateProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </CandidateProvider>
  );
}

export default App;