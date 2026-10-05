import { Helmet } from "react-helmet-async";
import { seoData } from "../data/personalData";

import Hero from "../components/sections/Hero";
import Marquee from "../components/sections/Marquee";
import Work from "../components/sections/Work";
import Services from "../components/sections/Services";
import About from "../components/sections/About";
import Toolbox from "../components/sections/Toolbox";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";

const LandingPage = () => (
  <>
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
    </Helmet>

    <Hero />
    <Marquee />
    <Work />
    <Services />
    <About />
    <Toolbox />
    <Process />
    <Contact />
  </>
);

export default LandingPage;
