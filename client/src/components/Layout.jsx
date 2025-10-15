import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useSidebar } from "../contexts/SidebarContext";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 pt-16">
        {isAuthenticated && (
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "w-64" : "w-0 lg:w-64"
            }`}
          >
            <div className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-md z-40 overflow-y-auto w-64">
              <Sidebar isOpen={true} onClose={closeSidebar} />
            </div>
          </div>
        )}

        <main
          className={`flex-1 transition-all duration-300 min-h-[calc(100vh-2rem)] ${
            isAuthenticated ? "lg:ml-64 min-h-[calc(100vh-2rem)]" : ""
          } p-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
