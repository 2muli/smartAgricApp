// import "./faq.css";
// const Faq = () => {
//   return (
//     <>
      {/* <section className="help-section1">
        <h2 style={{ marginBottom: "30px" }}>
          Frequently Asked Questions (FAQs)
        </h2>
        <details>
          <summary>How do I register as a farmer?</summary>
          <p>
            Click on "Sign Up" and select the "Farmer" option. Fill out the
            required details and verify your account.
          </p>
        </details>
        <details>
          <summary>Can I list multiple crops at once?</summary>
          <p>
            Yes, you can list multiple crops simultaneously by adding them to
            your dashboard.
          </p>
        </details>
        <details>
          <summary>Is my payment secure?</summary>
          <p>
            Absolutely! We use trusted payment gateways like M-Pesa to ensure
            secure transactions.
          </p>
        </details>
      </section> */}
      import { useState } from "react";
      const Item = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);
      
        return (
          <div id="faq" className="border rounded shadow-sm transition-all duration-300 hover:shadow-xl hover:border-deep-purple-accent-400">
            <button
              type="button"
              aria-label="Open item"
              title="Open item"
              className="flex items-center justify-between w-full p-4 focus:outline-none hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className="text-lg font-medium">{title}</p>
              <div className="flex items-center justify-center w-8 h-8 border rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  className={`w-3 text-gray-600 transition-transform duration-200 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                >
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    points="2,7 12,17 22,7"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div className="p-4 pt-0">
                <p className="text-gray-700">{children}</p>
              </div>
            )}
          </div>
        );
      };
      
      export const Faq = () => {
        return (
          <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
              <div class="flex flex-col mb-16 sm:text-center">
                <a href="/" class="mb-6 sm:mx-auto">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                    <svg
                      class="w-10 h-10 text-deep-purple-accent-400"
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
                </a>
                <div class="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                  <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span class="relative inline-block">
                      <svg
                        viewBox="0 0 52 24"
                        fill="currentColor"
                        class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                      >
                        <defs>
                          <pattern
                            id="ec5d8ef5-b853-4714-b94f-df28ec98eeb7"
                            x="0"
                            y="0"
                            width=".135"
                            height=".30"
                          >
                            <circle cx="1" cy="1" r=".7" />
                          </pattern>
                        </defs>
                        <rect
                          fill="url(#ec5d8ef5-b853-4714-b94f-df28ec98eeb7)"
                          width="52"
                          height="24"
                        />
                      </svg>
                      <span class="relative">FAQs</span>
                    </span>{' '}
                    Frequently Asked Questions
                  </h2>
                  <p class="text-base text-gray-700 md:text-lg">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque rem aperiam, eaque ipsa quae.
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <Item title="How do I register as a farmer??">
                Click on "Sign Up" and select the "Farmer" option. Fill out the
                required details and verify your account.
                </Item>
                <Item title="Can I list multiple crops at once???">
                Yes, you can list multiple crops simultaneously by adding them to
                your dashboard.
                </Item>
                <Item title="Is my payment secure??">
                Absolutely! We use trusted payment gateways like M-Pesa to ensure
                secure transactions.
                </Item>
                <Item title="Is my details secure?">
                Yes you details are much surece user cannot see them unless you use you credentials
                </Item>
              </div>
            </div>
          </div>
        );
      };

export default Faq;
