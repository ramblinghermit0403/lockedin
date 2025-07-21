// Home.js
import React from "react";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";

const Home = () => {
  return (
    <>
      <HeroBanner /> {/* ✅ Full-width on its own now */}
      <HomeContent />{" "}
      {/* ⛔ If this also needs full-width, remove container there too */}
      <Footer />
    </>
  );
};

export default Home;
