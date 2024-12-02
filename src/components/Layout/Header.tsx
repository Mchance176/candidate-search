import { Link } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            GitHub Recruiter
          </Link>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
