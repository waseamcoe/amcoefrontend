import React, { useContext, useEffect } from "react"
import { CSSTransition } from "react-transition-group"

import StateContext from "../StateContext"

// components
import Footer from "./Footer"
import MissionPane from "./MissionPane"
import Navigation from "./Navigation"
import Slider from "./Slider"
import Welcome from "./Welcome"
import NewsAndEvents from "./NewsAndEvents"
import CourseCategories from "./CourseCategories"
import NotificationPopUp from "./NotificationPopUp"

function Home() {
  const appState = useContext(StateContext)
  useEffect(() => {
    document.title = "Home - Abdullahi Mai-Kano College of Education, Wase"
  }, [])
  return (
    <>
      <Navigation />
      <CSSTransition in={appState.showPopUp} timeout={300} classNames={"show-flash"} unmountOnExit>
        <NotificationPopUp />
      </CSSTransition>
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
