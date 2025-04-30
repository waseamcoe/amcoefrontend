import React, { useContext } from "react"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function NotificationPopUp(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function closePopUp() {
    appDispatch({ type: "closePopUp" })
  }
  return (
    <div className="popup-main-container">
      <div className="popup-overlay" onClick={closePopUp}></div>
      <div className="popup-contents-cont">
        <div className="popup-close" onClick={closePopUp}>
          <i class="bx bx-x"></i>
        </div>
        <div className="popup-icon">
          <i class="bx bxs-bell-ring"></i>
        </div>
        <div className="popup-head">
          <h2 className="heading-font">{props.head}</h2>
        </div>
        <div className="popup-body">
          <p className="text-font">
            <Markdown>{props.body}</Markdown>
          </p>
        </div>
        <div className="popup-link">
          <Link to={`/annoucement/${props.id}`}>Read More...</Link>
        </div>
      </div>
    </div>
  )
}

export default NotificationPopUp
