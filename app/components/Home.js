import React, { useEffect } from "react"

// components
import Footer from "./Footer"
import MissionPane from "./MissionPane"
import Navigation from "./Navigation"
import Slider from "./Slider"
import Welcome from "./Welcome"
import NewsAndEvents from "./NewsAndEvents"
import CourseCategories from "./CourseCategories"

function Home() {
  useEffect(() => {
    document.title = "Home - Abdullahi Mai-Kano College of Education, Wase"
  }, [])
  return (
    <>
      <Navigation />
      <Slider />
      <Welcome />
      <NewsAndEvents />
      <MissionPane />
      <CourseCategories />
      <Footer />
    </>
  )
}

export default Home
