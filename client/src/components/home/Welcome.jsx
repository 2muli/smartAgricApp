import { Link } from "react-router-dom";
const Welcome = () => {
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="relative lg:w-1/2">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Smart Agric
              </p>
            </div>
            <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
              Welcome to Smart Agriculture
            </h5>
            <p className="mb-5 text-gray-800">
              Empowering Farmers and students through Technology <br />
              It has online tutorials that can used by both farmers and student for education 
              <br />
              Also for the farmer can save there information in the app upon creating the account 
              <br />
              For more click about{" "}
            </p>
            <div className="flex items-center">
              <Link to="/register">  
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition-all duration-300 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:shadow-xl hover:scale-110 hover:-translate-y-1 focus:shadow-outline focus:outline-none active:scale-95"
              >
                Get started
              </button>
              </Link>
              <Link
                to="/about"
                aria-label=""
                className="inline-flex items-center font-semibold transition-all duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800 hover:translate-x-2"
              >
                Learn More
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Welcome;