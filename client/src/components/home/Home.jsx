import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="hero-section">
        <h1 style={{ color: "white" }}>Welcome to Smart Agriculture</h1>
        <p style={{ color: "black", fontSize: "1rem" }}>
          Empowering Farmers and students through Technology <br />
          It has online tuturials that can used by both farmers and student for education 
          <br />
          Also for the farmer can save there information in the app upon creating the account 
          <br />
          For more click about{" "}
        </p>
        <div className="cta-buttons">
          <Link to="/register">
            <button>Join us</button>
          </Link>
          <Link to="/about">
            <button>About</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
