import React, { useContext } from "react"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function NotificationPopUp(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function closePopUp() {
    appDispatch({ type: "closePopUp" })
  }
  return (
    <AnimatePresence>
      <motion.div className="popup-main-container">
        <motion.div className="popup-overlay" onClick={closePopUp}></motion.div>
        <motion.div initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.3, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="popup-contents-cont">
          <motion.div className="popup-close" onClick={closePopUp}>
            <i class="bx bx-x"></i>
          </motion.div>
          <motion.div className="popup-icon">
            <i class="bx bxs-bell-ring"></i>
          </motion.div>
          <motion.div className="popup-head">
            <h2 className="heading-font">{props.head}</h2>
          </motion.div>
          <motion.div className="popup-body">
            <p className="text-font">
              <Markdown>{props.body}</Markdown>
            </p>
          </motion.div>
          <motion.div className="popup-link">
            <Link to={`/annoucement/${props.id}`}>Read More...</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default NotificationPopUp
