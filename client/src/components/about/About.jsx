import { Link } from 'react-router-dom';
import './about.css'; // Optional: Add CSS for styling

const About = () => {
  return (
    <div className="about-container2">
      <section className="about-section1">
        <h2>What is Smart Agriculture?</h2>
        <p>
          Smart Agriculture is a heartwarming digital companion built to empower farmers with the tools they need to thrive in the modern agricultural world. Designed with love and care, this app helps Kenyan farmers manage their crops and livestock, stay informed about the weather, learn from tutorials, and stay secure—every step of the way.
        </p>
        <p>
          At its core, Smart Agriculture is about transforming traditional farming into a smarter, safer, and more productive experience. With simple features and a farmer-friendly design, it brings technology closer to the soil.
        </p>

        <h2>Why Smart Agriculture is Special</h2>
        <ul>
          <li>🌾 Effortless Record Keeping: Farmers can easily manage and store important details about their crops and livestock.</li>
          <li>☁️ Accurate Weather Forecasting: Stay a step ahead of the rain or shine with reliable, location-based weather updates.</li>
          <li>📚 Educational Tutorials: Learn farming best practices, increase productivity, and grow with confidence through well-crafted lessons and videos.</li>
          <li>🔒 Enhanced Security: Say goodbye to data loss and theft—Smart Agriculture puts privacy and protection first.</li>
          <li>🔐 Safe Login and Registration: Every user has a secure account to access personalized features and data.</li>
        </ul>

        <h2>What You Can Do with Smart Agriculture</h2>
        <h3>🌿 For Farmers:</h3>
        <ul>
          <li>📝 Keep Livestock Records: Track health, age, vaccinations, and productivity of your animals.</li>
          <li>🌱 Manage Crop Records: Log planting dates, harvest times, crop types, and yields with ease.</li>
          <li>📈 View Weather Forecasts: Make informed farming decisions based on real-time weather data.</li>
          <li>🎥 Watch Tutorials: Access a library of videos and tips to boost your farming skills.</li>
        </ul>

        <h2>The Heartfelt Impact of Smart Agriculture</h2>
        <p>
          Smart Agriculture is still growing, but it’s already making a difference:
        </p>
        <ul>
          <li>✅ Helped hundreds of farmers digitize their records for the first time.</li>
          <li>✅ Brought farming knowledge to fingertips through simple tutorials.</li>
          <li>✅ Improved safety and confidence with secure login systems.</li>
        </ul>

        <h2>Be Part of the Smart Agriculture Family 💚</h2>
        <p>
          Whether you're tending to crops, caring for animals, or just starting your farming journey, Smart Agriculture is here to walk with you. Let's grow a brighter, more connected future for agriculture—together.
        </p>
        <Link to="/register" >
          <button style={{ marginBottom: "30px" }}>Sign Up Now</button>
        </Link>
      </section>
    </div>
  );
};

export default About;
