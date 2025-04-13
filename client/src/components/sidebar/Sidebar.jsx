import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Make sure this path is correct

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useContext(AuthContext);

  const [activeSection, setActiveSection] = useState("");

  // Detect current route and set active section
  useEffect(() => {
    if (location.pathname.includes("crops")) {
      setActiveSection("crops");
    } else if (location.pathname.includes("livestock")) {
      setActiveSection("livestock");
    } else {
      setActiveSection(""); // Reset if not in any known section
    }
  }, [location]);

  // Handle logout
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 🚫 Don't show sidebar if user isn't authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {activeSection === "crops" && (
          <>
            <li className="nav-item">
              <Link to="/crops" className="nav-link">
                <i className="bi bi-clipboard-data"></i>
                <span>Crop Records</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/googletutorial" className="nav-link">
                <i className="bi bi-journal-bookmark"></i>
                <span>Crop Tutorials</span>
              </Link>
            </li>
            <li className="nav-item">
          <Link to="/dashboard/livestock" className="nav-link">
            <i className="bi bi-house-heart"></i>
            <span>Animals</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/welcome" className="nav-link">
            <i className="bi bi-arrow-left-circle"></i>
            <span>Back</span>
          </Link>
        </li>
          </>
        )}

        {activeSection === "livestock" && (
          <>
            <li className="nav-item">
              <Link to="/animals" className="nav-link">
                <i className="bi bi-journal-medical"></i>
                <span>Livestock Records</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/googletutorial" className="nav-link">
                <i className="bi bi-journal-bookmark"></i>
                <span>Animal Tutorials</span>
              </Link>
            </li>
            <li className="nav-item">
          <Link to="/dashboard/crops" className="nav-link">
            <i className="bi bi-droplet"></i>
            <span>Crops</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/welcome" className="nav-link">
            <i className="bi bi-arrow-left-circle"></i>
            <span>Back</span>
          </Link>
        </li>
          </>
        )}
        {(activeSection !== "crops" && activeSection !== "livestock")&&
         (
          <>
          <li className="nav-item">
          <Link to="/dashboard/livestock" className="nav-link">
            <i className="bi bi-house-heart"></i>
            <span>Animals</span>
          </Link>
        </li>
<li className="nav-item">
          <Link to="/dashboard/crops" className="nav-link">
            <i className="bi bi-droplet"></i>
            <span>Crops</span>
          </Link>
        </li>
        </>
         )}
           
      </ul>
    </aside>
  );
};

export default Sidebar;
