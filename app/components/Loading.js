import React from "react"
import Footer from "./Footer"
import Navigation from "./Navigation"

function Loading() {
  return (
    <>
      <Navigation />
      <div className="loading-cont">
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

// function Loading() {
//   return <div className="loading"></div>
// }

export default Loading
