import { useState } from "react";
import Footer from "./Footer.jsx";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-container">
        {isAuthenticated && <Sidebar isSidebarOpen={isSidebarOpen} />}
        <main id="main" className="main">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
