import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "./ReusableComp/Button"
import SmallLoading from "../components/SmallLoading"

import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"

function Navigation() {
  const appState = useContext(StateContext)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [state, setState] = useImmer({
    schools: [],
  })

  function handleClick() {
    const navlines = document.querySelectorAll(".mnav")
    const navContainer = document.querySelector(".nav-bar")
    navlines[0].classList.toggle("n1open")
    navlines[1].classList.toggle("n2open")
    navlines[2].classList.toggle("n3open")
    if (!isNavOpen) {
      navContainer.classList.remove("slideOut")
      navContainer.classList.add("slideIn")
      setIsNavOpen(true)
    } else {
      navContainer.classList.replace("slideIn", "slideOut")
      setIsNavOpen(false)
    }
  }

  useEffect(() => {
    // fetch school info
    Axios.get(`${appState.backendURL}`)
      .then(response => {
        setState(draft => {
          draft.schools = response.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className="header shadow-sm bg-white flex items-center justify-between px-5 sticky top-0">
        <div className="logo">
          <div className="logo-img">
            <Link to="/">
              <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/q_10/v1722691227/1000075734_hlznks.png" alt="logo" />
            </Link>
          </div>
          <div className="logo-head">
            <h2>ABDULLAHI MAI-KANO COLLEGE OF EDUCATION, WASE</h2>
            <p>Knowledge Leads and Cannot be Led</p>
          </div>
        </div>
        {/* Three navigation lines for mobile phones */}
        <div onClick={handleClick} className="mobile-menu">
          <div className="n1 mnav"></div>
          <div className="n2 mnav"></div>
          <div className="n3 mnav"></div>
        </div>
        {/* <!-- desktop navgation bar --> */}
        <div className="nav-bar">
          <div className="nav">
            <ul>
              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li>Programme</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  {state.schools.length ? (
                    <>
                      {state.schools.map(school => (
                        <Link to={`/school/${school._id}`}>
                          <li>{school.name}</li>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <SmallLoading width={"20px"} height={"20px"} message="Getting Details..." />
                  )}
                </ul>
              </a>
              <Link style={{ flexDirection: "row", alignItems: "center" }} to={"#"}>
                <li>Admission</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to={"/pre-nce"}>
                    <li>Pre-NCE</li>
                  </Link>
                  <Link to={"/nce"}>
                    <li>NCE</li>
                  </Link>
                  <Link to={"/diploma"}>
                    <li>Diploma</li>
                  </Link>
                  <Link to={"/check-status"}>
                    <li>Check Admission</li>
                  </Link>
                </ul>
              </Link>
              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li>Portal</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to={"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=ARpgrqej55x0JpTP_UDQb6J47VCSHUgxv7YVX_ALyDwl1KiVQXMkIMJW-KMCBnohoCjwoyJCqs-1&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1041956075%3A1727556137016347&ddm=1"}>
                    <li>Email</li>
                  </Link>
                  <Link to={"/student/portal"}>
                    <li>Student Portal</li>
                  </Link>
                  <Link to={"/admin/dashboard/dashboard"}>
                    <li>Admin Portal</li>
                  </Link>
                  <Link to={"/alumni"}>
                    <li>Alumni</li>
                  </Link>
                </ul>
              </a>

              <Link style={{ flexDirection: "row", alignItems: "center" }} to={"/library"}>
                <li>Library</li>
              </Link>
              <Link style={{ flexDirection: "row", alignItems: "center" }} to={"/history-of-amcoe"}>
                <li>About Us</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to="/vision-and-mission">
                    <li>Vision and Mission</li>
                  </Link>
                  <Link to="/history-of-amcoe">
                    <li>History of AMCOE</li>
                  </Link>
                  <Link to={"/life-in-amcoe"}>
                    <li>Life in AMCOE</li>
                  </Link>
                  <Link to={"programmes"}>
                    <li>Programmes</li>
                  </Link>
                  <Link to={"/contact"}>
                    <li>Contact us</li>
                  </Link>
                </ul>
              </Link>
              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li>News</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to={"/school/news"}>
                    <li>News Headlines</li>
                  </Link>
                  <Link to={"/school/news"}>
                    <li>Special Bulletin</li>
                  </Link>
                  <Link to={"/school/news"}>
                    <li>News and Magazine</li>
                  </Link>
                  <Link to={"/symposis"}>
                    <li>Symposis</li>
                  </Link>
                </ul>
              </a>
              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li className="search-icon">
                  <i class="fas fa-search"></i>
                </li>
              </a>
              <Link to="">
                <Button label={"Resources"} />
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
