import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Search Candidates
            </Link>
          </li>
          <li>
            <Link 
              to="/saved" 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Saved Candidates
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 