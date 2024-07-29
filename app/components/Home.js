import React from "react"

// components
import Footer from "./Footer"
import MissionPane from "./MissionPane"
import Navigation from "./Navigation"
import Slider from "./Slider"
import Welcome from "./Welcome"
import NewsAndEvents from "./NewsAndEvents"

function Home() {
  return (
    <>
      <Navigation />
      <Slider />
      <Welcome />
      <MissionPane />
      <NewsAndEvents />
      <Footer />
    </>
  )
}

export default Home
