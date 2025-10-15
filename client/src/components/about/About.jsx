import { Link } from 'react-router-dom';

const About = () => {
  return (
  
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              About Us
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Learn more about Smart Agriculture and how we're empowering farmers with technology.
            </p>
          </div>
          <div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-8 border-b sm:border-r transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:-translate-y-2 cursor-pointer">
              <div className="max-w-md text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <h6 className="mb-2 font-semibold leading-5">What is Smart Agriculture?</h6>
                <p className="mb-3 text-sm text-gray-900">
          Smart Agriculture is a heartwarming digital companion built to empower farmers with the tools they need to thrive in the modern agricultural world. Designed with love and care, this app helps Kenyan farmers manage their crops and livestock, stay informed about the weather, learn from tutorials, and stay secure—every step of the way.
    
         At its core, Smart Agriculture is about transforming traditional farming into a smarter, safer, and more productive experience. With simple features and a farmer-friendly design, it brings technology closer to the soil.
             </p>
              </div>
            </div>
            <div className="p-8 border-b lg:border-r transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:-translate-y-2 cursor-pointer">
              <div className="max-w-md text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <h6 className="mb-2 font-semibold leading-5">Why Smart Agriculture is Special</h6>
                <p className="mb-3 text-sm text-gray-900">
                Effortless Record Keeping: Farmers can easily manage and store important details about their crops and livestock.
                Accurate Weather Forecasting: Stay a step ahead of the rain or shine with reliable, location-based weather updates.
                Educational Tutorials: Learn farming best practices, increase productivity, and grow with confidence through well-crafted lessons and videos.
                Enhanced Security: Say goodbye to data loss and theft—Smart Agriculture puts privacy and protection first.
                 Safe Login and Registration: Every user has a secure account to access personalized features and data.
                </p>
              </div>
            </div>
            <div className="p-8 border-b sm:border-r lg:border-r-0 transition-all duration-300 hover:shadow-xl hover:bg-indigo-50 hover:-translate-y-2 cursor-pointer">
              <div className="max-w-md text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
                  <svg
                    className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
                <h6 className="mb-2 font-semibold leading-5">What You Can Do with Smart Agriculture</h6>
                <p className="mb-3 text-sm text-gray-900">
                For Farmers:
                Keep Livestock Records: Track health, age, vaccinations, and productivity of your animals.
                Manage Crop Records: Log planting dates, harvest times, crop types, and yields with ease.
                View Weather Forecasts: Make informed farming decisions based on real-time weather data.
                Watch Tutorials: Access a library of videos and tips to boost your farming skills.
                </p>
              </div>
            </div>
          </div>
        </div>
    
  );
};

export default About;
