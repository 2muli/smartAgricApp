import { useParams } from "react-router-dom";
import Sidebar from "./../sidebar/Sidebar";

const Dashboard = () => {
  const { section } = useParams(); // 'crops' or 'livestock'

  return (
    <div className="dashboard-layout min-h-[calc(100vh-2rem)]">
      <Sidebar initialSection={section} />
      {/* You can place the main dashboard content here */}
      <div className="dashboard-content">
        <h2>Welcome to the {section ? section.charAt(0).toUpperCase() + section.slice(1) : 'Main'} Dashboard</h2>
      </div>
    </div>
  );
};

export default Dashboard;
