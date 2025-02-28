import React, { useContext } from "react"
import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"

function DialogBox(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  return (
    <div className="overlay" onClick={() => props.setShowDialog(false)}>
      <div className="dialog-cont">
        <div className="dialog-head">
          <div className="dialog-head-text">
            <h3 className="heading-font">Notification</h3>
          </div>
          <div className="dialog-close" onClick={() => props.setShowDialog(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="dialog-message">
          <p className="text-font">{props.data}</p>
        </div>
        <div className="dialog-buttons">
          <div className="dialog-cancel" onClick={() => props.setShowDialog(false)}>
            <button className="action-button" style={{ padding: "6px 12px", color: "#000" }}>
              Cancel
            </button>
          </div>
          <div onClick={() => props.setSentRequest(true)}>
            <button className="action-button" style={{ padding: "6px 12px", background: "#ff5959", color: "#fff" }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogBox
