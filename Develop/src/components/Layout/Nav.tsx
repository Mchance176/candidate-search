import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <NavLink 
            to="/"
            className={({ isActive }) => 
              isActive 
                ? 'px-3 py-2 rounded-md bg-blue-500 text-white' 
                : 'px-3 py-2 rounded-md text-gray-600 hover:text-gray-900'
            }
          >
            Search Candidates
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/saved"
            className={({ isActive }) => 
              isActive 
                ? 'px-3 py-2 rounded-md bg-blue-500 text-white' 
                : 'px-3 py-2 rounded-md text-gray-600 hover:text-gray-900'
            }
          >
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;