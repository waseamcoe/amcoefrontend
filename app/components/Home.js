import React, { useContext, useEffect, useState } from "react"
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
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [notification, setNotification] = useState({})
  useEffect(() => {
    document.title = "Home - Abdullahi Mai-Kano College of Education, Wase"
    // check for notification by sending an http request to the server
    Axios.get(`${appState.backendURL}/check-notification`)
      .then(response => {
        setNotification(response.data)
        appDispatch({ type: "openPopUp" })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Navigation />
      <CSSTransition in={appState.showPopUp} timeout={300} classNames={"show-flash"} unmountOnExit>
        <NotificationPopUp head={notification.head} body={notification.body} id={notification._id} />
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
