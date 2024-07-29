import React, { useEffect } from "react"
import { useImmer } from "use-immer"
import { Link } from "react-router-dom"
import Button from "./ReusableComp/Button"

function MissionPane() {
  const [state, setState] = useImmer({
    isAboutActive: true,
    isMissionActive: false,
    isVisionActive: false,
  })
  const borderStyle = { borderBottom: "1px solid #05a081" }

  // This runs once whenever the page loads, it scroll the window the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleChange(e, link) {
    e.preventDefault()
    if (link == "about") {
      setState(draft => {
        draft.isVisionActive = false
        draft.isMissionActive = false
        draft.isAboutActive = true
      })
    } else if (link == "vision") {
      setState(draft => {
        draft.isAboutActive = false
        draft.isMissionActive = false
        draft.isVisionActive = true
      })
    } else {
      setState(draft => {
        draft.isAboutActive = false
        draft.isVisionActive = false
        draft.isMissionActive = true
      })
    }
  }
  return (
    <div className="pane-container">
      <div className="pane-container-inner">
        <div className="pane-image-container">
          <Link to="/history-of-amcoe">
            <div className="overlay pane-overlay">
              <h3 className="text-font">Want to know more About the College?</h3>
            </div>
          </Link>
          <img src="../images/amcoe23.jpeg" />
        </div>
        <div className="pane-text-container">
          <div className="pane-navs-container">
            <a onClick={e => handleChange(e, "about")} href="#" style={state.isAboutActive ? borderStyle : {}}>
              About Us
            </a>
            <a onClick={e => handleChange(e, "mission")} href="#" style={state.isMissionActive ? borderStyle : {}}>
              Mission
            </a>
            <a onClick={e => handleChange(e, "vision")} href="#" style={state.isVisionActive ? borderStyle : {}}>
              Vision
            </a>
          </div>
          {state.isAboutActive ? (
            <div className="pane-text-text">
              <p className="text-font">Wase Local Government Area and its environs are highly educationally disadvantaged. The 12th Emir of Wase, HRH Alhaji Abdullahi Maikano...</p>
              <Link to="/history-of-amcoe">
                <Button label={"Read More"} />
              </Link>
            </div>
          ) : state.isMissionActive ? (
            <div className="pane-text-text">
              <p className="text-font">To produce outstanding educators, researchers, and leaders thereby advancing the broadly defined profession of education and enhancing nationa... </p>
              <Link to="/vision-and-mission">
                <Button label={"Read More"} />
              </Link>
            </div>
          ) : (
            <div className="pane-text-text">
              <p className="text-font">To be outstanding in: (a) the integration of teaching and learning, enhancement of human knowledge through research and scholarship, and (4) leadership in...</p>
              <Link to="/vision-and-mission">
                <Button label={"Read More"} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MissionPane
