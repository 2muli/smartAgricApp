import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSidebar } from "../../contexts/SidebarContext";
import { toast } from "react-toastify";
import { IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  // State to track mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
      toast.warning("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-green-700 fixed w-full z-50">
      <div className="px-2 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-2">
        <div className="relative flex items-center justify-between">
          
          {/* Left Side: Hamburger + Logo + Links */}
          <div className="flex items-center">
            {/* Hamburger Menu for Sidebar (Desktop - only when authenticated) */}
            {isAuthenticated && (
              <IconButton 
                variant="text" 
                size="lg" 
                onClick={toggleSidebar} 
                className="text-white mr-4 hidden lg:inline-flex"
              >
                {isSidebarOpen ? (
                  <XMarkIcon className="h-6 w-6 stroke-2" />
                ) : (
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                )}
              </IconButton>
            )}
            
            <Link
              to="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <svg
                className="w-8 text-teal-accent-400"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Smart Agric
              </span>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center space-x-8">
              <li>
                <Link to="/weather" className="font-medium text-gray-100 hover:text-teal-accent-400 transition-colors duration-200">
                  Weather Prediction
                </Link>
              </li>
              <li>
                <Link to="/googletutorial" className="font-medium text-gray-100 hover:text-teal-accent-400 transition-colors duration-200">
                  Online Tutorials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-medium text-gray-100 hover:text-teal-accent-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="font-medium text-gray-100 hover:text-teal-accent-400 transition-colors duration-200">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-medium text-gray-100 hover:text-teal-accent-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-medium text-gray-100 hover:text-teal-accent-400 transition-colors duration-200">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn bg-deep-purple-accent-400 hover:bg-deep-purple-700 text-white px-6 py-2 rounded">
                  Sign Up
                </Link>
                <Link to="/login" className="btn bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-gray-900">
                  Sign In
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-gray-900"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isAuthenticated && (
              <IconButton variant="text" size="lg" onClick={toggleSidebar} className="text-white">
                {isSidebarOpen ? (
                  <XMarkIcon className="h-6 w-6 stroke-2" />
                ) : (
                  <Bars3Icon className="h-6 w-6 stroke-2" />
                )}
              </IconButton>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded focus:outline-none focus:shadow-outline bg-gray-800 text-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
                <path d="M23,6H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
                <path d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 text-white lg:hidden shadow-md">
          <ul className="flex flex-col p-5 space-y-4">
            <li>
              <Link to="/weather" onClick={() => setIsMenuOpen(false)}>
                Weather Prediction
              </Link>
            </li>
            <li>
              <Link to="/googletutorial" onClick={() => setIsMenuOpen(false)}>
                Online Tutorials
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/help" onClick={() => setIsMenuOpen(false)}>
                Help
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={() => setIsMenuOpen(false)}>
                FAQs
              </Link>
            </li>

            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/register" className="block w-full text-center bg-deep-purple-accent-400 py-2 rounded">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="block w-full text-center border border-white py-2 rounded">
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-center border border-white py-2 rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
export { Navbar };
