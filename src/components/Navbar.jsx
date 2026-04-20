import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiPlus } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-secondary bg-opacity-95 backdrop-blur-md border-b border-accent border-opacity-20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-accent hover:text-blue-400 transition">
          📝 BlogHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-neutral hover:text-accent transition font-medium">Home</Link>
          
          {user ? (
            <>
              <Link 
                to="/create" 
                className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <FiPlus /> Write
              </Link>
              <span className="text-neutral text-sm">Welcome, {user.name}!</span>
              <button 
                onClick={handleLogout}
                className="text-neutral hover:text-danger transition"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-neutral hover:text-accent transition">Login</Link>
              <Link to="/register" className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary py-4 border-t border-accent border-opacity-20">
          <Link to="/" className="block px-4 py-2 text-neutral hover:text-accent transition">Home</Link>
          {user ? (
            <>
              <Link to="/create" className="block px-4 py-2 text-neutral hover:text-accent transition">Write</Link>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-danger hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-neutral hover:text-accent transition">Login</Link>
              <Link to="/register" className="block px-4 py-2 text-neutral hover:text-accent transition">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}