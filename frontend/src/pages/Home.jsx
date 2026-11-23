import React from 'react';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import AboutUs from '../components/AboutUs/AboutUs';
import Activities from '../components/Activities/Activities';
import TribeRoots from '../components/TribeRoots/TribeRoots';
import Partners from '../components/Partners/Partners';
import Voices from '../components/Voices/Voices';
import FieldsOfWork from '../components/FieldsOfWork/FieldsOfWork';
import WorkGallery from '../components/WorkGallery/WorkGallery';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutUs />
      <FieldsOfWork />
      <WorkGallery />
      <Activities />
      <TribeRoots />
      <Partners />
      <Voices showReadMore={true} />
      <Footer />
    </>
  );
}

export default Home;
