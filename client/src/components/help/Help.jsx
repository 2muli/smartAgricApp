import "./help.css"; // Import CSS for styling

const Help = () => {
  return (
    <div className="help-container">
      {/* Main Title */}
      <h1 className="help-title">How to Use Smart Agriculture</h1>

      {/* Introduction Section */}
      <section className="help-section">
        <h2 className="help-header">Getting Started</h2>
        <div className="help-content">
          <p>
            Welcome to Smart Agriculture, your trusted digital companion for smarter farming and secure record keeping. Here's how to begin your journey:
          </p>
          <ol>
            <li>
              <strong>Register or Log In:</strong> Create an account with your details, or log in if you already have one. Your data is safe and protected.
            </li>
            <li>
              <strong>Choose Your Role:</strong> Once logged in, you can choose whether to manage <em>Livestock</em> or <em>Crop</em> records.
            </li>
            <li>
              <strong>Explore Features:</strong> Access helpful tutorials, view weather forecasts, and keep accurate records of your farming activities.
            </li>
            <li>
              <strong>Stay Secure:</strong> Your personal data and farm records are stored securely, so you can focus on what truly matters — your farm.
            </li>
          </ol>
        </div>

        {/* Guide for Farmers */}
        <h2 className="help-header">Guide for Farmers</h2>
        <div className="help-content">
          <h3 className="help-subheader">Step 1: Register or Log In</h3>
          <p>
            Begin by creating an account with your name, contact, and location. After login, you’ll land on your personalized dashboard.
          </p>

          <h3 className="help-subheader">Step 2: Select Record Type</h3>
          <p>
            Choose whether to manage <strong>Livestock</strong> or <strong>Crop</strong> data. This helps you focus your records based on what you farm.
          </p>

          <h3 className="help-subheader">Step 3: Record Your Data</h3>
          <p>
            Enter details like animal type, health, feed routines (for livestock) or crop type, planting/harvest dates, yield info (for crops).
          </p>

          <h3 className="help-subheader">Step 4: Use Weather Forecast</h3>
          <p>
            Always be prepared. View upcoming weather forecasts right from your dashboard to plan your activities wisely.
          </p>

          <h3 className="help-subheader">Step 5: Learn with Tutorials</h3>
          <p>
            Access our helpful tutorials — covering everything from pest control to improving yields — and grow your farming knowledge.
          </p>

          <h3 className="help-subheader">Step 6: Enjoy Peace of Mind</h3>
          <p>
            All your farm data is securely stored and only accessible by you. Focus on growing — we’ll take care of the safety.
          </p>
        </div>

        {/* For All Users */}
        <h2 className="help-header">Need Extra Help?</h2>
        <div className="help-content">
          <p>
            If you ever feel lost or need more guidance, don’t worry, dear. Our support team is just a message away. You're never alone on this journey.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Help;
