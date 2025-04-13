import { Link } from "react-router-dom";
import "./home.css";

const Welcome = () => {
  return (
    <>
      <div className="hero-section">
        <h1 style={{ color: "white" }}>Welcome to Smart Agriculture</h1>
        <p style={{ color: "black", fontSize: "1rem" }}>
          Click To View Respective Records
        </p>
        <div className="cta-buttons">
          <Link to="/dashboard/crops">
            <button>Crops</button>
          </Link>
          <Link to="/dashboard/livestock">
            <button>Livestock</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
