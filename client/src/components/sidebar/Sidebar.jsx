import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  ArrowLeftCircleIcon,
  XMarkIcon,
  PowerIcon
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useContext(AuthContext);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (location.pathname.includes("crops")) {
      setActiveSection("crops");
    } else if (location.pathname.includes("livestock")) {
      setActiveSection("livestock");
    } else {
      setActiveSection("");
    }
  }, [location]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
      toast.warning("Logout successful!");
      onClose(); // only close when explicitly logging out
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed!");
    }
  };

  if (!isAuthenticated) return null;

  return (
    // 👇 Important: disable outside click close
    <Drawer open={isOpen} onClose={() => {}} overlay={false}>
      <Card color="transparent" shadow={false} className="h-[calc(100vh-2rem)] p-16">
        <List>
          <Link to="/dashboard">
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>

          {activeSection === "crops" && (
            <>
              <Link to="/crops">
                <ListItem>
                  <ListItemPrefix>
                    <i className="bi bi-clipboard-data text-lg"></i>
                  </ListItemPrefix>
                  Crop Records
                </ListItem>
              </Link>
              <Link to="/googletutorial">
                <ListItem>
                  <ListItemPrefix>
                    <BookOpenIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Crop Tutorials
                </ListItem>
              </Link>
              <Link to="/dashboard/livestock">
                <ListItem>
                  <ListItemPrefix>
                    <i className="bi bi-house-heart text-lg"></i>
                  </ListItemPrefix>
                  Animals
                </ListItem>
              </Link>
              <Link to="/welcome">
                <ListItem>
                  <ListItemPrefix>
                    <ArrowLeftCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Back
                </ListItem>
              </Link>
            </>
          )}

          {activeSection === "livestock" && (
            <>
              <Link to="/animals">
                <ListItem>
                  <ListItemPrefix>
                    <i className="bi bi-journal-medical text-lg"></i>
                  </ListItemPrefix>
                  Livestock Records
                </ListItem>
              </Link>
              <Link to="/googletutorial">
                <ListItem>
                  <ListItemPrefix>
                    <BookOpenIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Animal Tutorials
                </ListItem>
              </Link>
              <Link to="/dashboard/crops">
                <ListItem>
                  <ListItemPrefix>
                    <i className="bi bi-droplet text-lg"></i>
                  </ListItemPrefix>
                  Crops
                </ListItem>
              </Link>
              <Link to="/welcome">
                <ListItem>
                  <ListItemPrefix>
                    <ArrowLeftCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Back
                </ListItem>
              </Link>
            </>
          )}

          {activeSection !== "crops" && activeSection !== "livestock" && (
            <>
              <Link to="/dashboard/livestock">
                <ListItem>
                  <ListItemPrefix>
                    <i className="bi bi-house-heart text-lg"></i>
                  </ListItemPrefix>
                  Animals
                </ListItem>
              </Link>
              <Link to="/dashboard/crops">
                <ListItem>
                  <ListItemPrefix>
                    <i className="bi bi-droplet text-lg"></i>
                  </ListItemPrefix>
                  Crops
                </ListItem>
              </Link>
            </>
          )}
        </List>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </Card>
    </Drawer>
  );
};

export default Sidebar;
