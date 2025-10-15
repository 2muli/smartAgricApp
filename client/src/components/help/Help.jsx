import { Link } from "react-router-dom";
const Help = () => {
  return (
    <div id="help" className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      {/* Main Title */}
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          How to Use Smart Agriculture
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Welcome to Smart Agriculture, your trusted digital companion for smarter farming and secure record keeping. Here's how to begin your journey:
        </p>
      </div>

      {/* Getting Started Section */}
      <div className="grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-1 sm:grid-cols-1">
        <div className="duration-300 transform bg-white border-l-4 border-deep-purple-accent-400 hover:-translate-y-2 hover:shadow-xl hover:border-deep-purple-accent-700 cursor-pointer">
          <div className="h-full p-5 border border-l-0 rounded-r shadow-sm transition-all duration-300">
            <h6 className="mb-2 font-semibold leading-5">Step 1: Register or Log In</h6>
            <p className="text-sm text-gray-900">
              Create an account with your details, or log in if you already have one. Your data is safe and protected.
            </p>
          </div>
        </div>

        <div className="duration-300 transform bg-white border-l-4 border-deep-purple-accent-400 hover:-translate-y-2 hover:shadow-xl hover:border-deep-purple-accent-700 cursor-pointer">
          <div className="h-full p-5 border border-l-0 rounded-r shadow-sm transition-all duration-300">
            <h6 className="mb-2 font-semibold leading-5">Step 2: Select Record Type</h6>
            <p className="text-sm text-gray-900">
              Choose whether to manage <strong>Livestock</strong> or <strong>Crop</strong> data. Focus on records based on what you farm.
            </p>
          </div>
        </div>

        <div className="duration-300 transform bg-white border-l-4 border-deep-purple-accent-400 hover:-translate-y-2 hover:shadow-xl hover:border-deep-purple-accent-700 cursor-pointer">
          <div className="h-full p-5 border border-l-0 rounded-r shadow-sm transition-all duration-300">
            <h6 className="mb-2 font-semibold leading-5">Step 3: Record Your Data</h6>
            <p className="text-sm text-gray-900">
              Enter details like animal type, health, feed routines (for livestock) or crop type, planting/harvest dates, yield info (for crops).
            </p>
          </div>
        </div>

        <div className="duration-300 transform bg-white border-l-4 border-deep-purple-accent-400 hover:-translate-y-2 hover:shadow-xl hover:border-deep-purple-accent-700 cursor-pointer">
          <div className="h-full p-5 border border-l-0 rounded-r shadow-sm transition-all duration-300">
            <h6 className="mb-2 font-semibold leading-5">Step 4: Use Weather Forecast & Tutorials</h6>
            <p className="text-sm text-gray-900">
              View upcoming weather forecasts right from your dashboard and access helpful tutorials — everything from pest control to improving yields.
            </p>
          </div>
        </div>

        <div className="duration-300 transform bg-white border-l-4 border-deep-purple-accent-400 hover:-translate-y-2 hover:shadow-xl hover:border-deep-purple-accent-700 cursor-pointer">
          <div className="h-full p-5 border border-l-0 rounded-r shadow-sm transition-all duration-300">
            <h6 className="mb-2 font-semibold leading-5">Step 5: Stay Secure</h6>
            <p className="text-sm text-gray-900">
              All your farm data is securely stored and only accessible by you. Focus on growing — we take care of safety.
            </p>
          </div>
        </div>

        <div className="duration-300 transform bg-white border-l-4 border-deep-purple-accent-400 hover:-translate-y-2 hover:shadow-xl hover:border-deep-purple-accent-700 cursor-pointer">
          <div className="h-full p-5 border border-l-0 rounded-r shadow-sm transition-all duration-300">
            <h6 className="mb-2 font-semibold leading-5">Need Extra Help?</h6>
            <p className="text-sm text-gray-900">
              If you ever feel lost or need guidance, our support team is just a message away. You're never alone on this journey.
            </p>
          </div>
        </div>
      </div>

      {/* Learn More Button */}
      <div className="text-center">
        <Link
        to="/register"
        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition-all duration-300 rounded shadow-md md:w-auto bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:shadow-xl hover:scale-110 hover:-translate-y-1 focus:shadow-outline focus:outline-none active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
export default Help