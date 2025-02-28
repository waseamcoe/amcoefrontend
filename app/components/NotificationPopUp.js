import React, { useContext } from "react"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function NotificationPopUp() {
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
          <h2 className="heading-font">MID-SEMESTER BREAK</h2>
        </div>
        <div className="popup-body">
          <p className="text-font">
            <Markdown>This is to inform all lectures that the registrar has approved the MID-SEMESTER break as from Saturday **1/03/2025** to Wednesday **9/04/2025**. Meanwhile, first semester exam will commence on the **14/04/2025**. We are appealing to all lecturers to submit their exam questions to the exam coordinator on or before **10/03/2025**. The college management is wishing all lecturers happy sallah celebration. **Signed DAP for registrar**</Markdown>
          </p>
        </div>
        <div className="popup-link">
          <Link to="/news/67c216c7afb2cbc272c88748">Read More...</Link>
        </div>
      </div>
    </div>
  )
}

export default NotificationPopUp
