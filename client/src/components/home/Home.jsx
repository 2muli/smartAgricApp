import { Link } from "react-router-dom";
import Welcome from "./Welcome";
import About from "../about/About";
import Help from "../help/Help";
import Faq from "../faq/Faq";
import Contact from "../contact/Contact";
const Home = () => {
  return (
    <>
    <Welcome/>
    <Help/>
    <About/>
    <Faq/>
    <Contact/>
    </>
  );
};

export default Home;
