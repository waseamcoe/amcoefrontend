import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Navigation from "./Navigation"
import Button from "./ReusableComp/Button"

function PageNotFound() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Navigation />
      <div className="p404-cont">
        <div className="p404-inner">
          <div className="p404-head-cont">
            <h1 className="heading-font">404</h1>
          </div>
          <div className="p404-not-found">
            <h2 className="heading-font">Page not found</h2>
          </div>
          <div className="p404-note">
            <p className="text-font">Sorry, but we cannot find the page you are looking for. It might be under construction...</p>
          </div>
          <div className="p404-button">
            <Link to={"/"}>
              <Button label={"BACK TO HOME"} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PageNotFound
