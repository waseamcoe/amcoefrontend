import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Button from "./ReusableComp/Button"

function Navigation() {
  const [selectedElem, setSelectedElem] = useState(null)
  const [isNavOpen, setIsNavOpen] = useState(false)

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

  function rotateIcon(e) {
    if (window.innerWidth < 500) {
      let dropDown = e.children[2]
      if (!dropDown.parentElement.children[1].classList.contains("rotate")) {
        dropDown.parentElement.children[1].classList.add("rotate")
      } else {
        dropDown.parentElement.children[1].classList.remove("rotate")
      }
    }
  }

  function showDropDown(e) {
    closeCurrentTab()
    if (e.nodeName === "A") {
      let dropDown = e.children[2]
      rotateIcon(e)
      dropDown.classList.toggle("showNav")
    } else {
      setSelectedElem(e)
      rotateIcon(e.parentElement)
      e.parentElement.children[2].classList.toggle("showNav")
    }
  }

  function closeCurrentTab() {
    if (selectedElem) {
      console.log(selectedElem)
    } else {
      setSelectedElem(null)
    }
  }

  return (
    <>
      <div onClick={closeCurrentTab} className="nav-overlay"></div>
      <div className="header">
        <div className="logo">
          <div className="logo-img">
            <Link to="/">
              <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710271781/logo_x5lxz6.jpg" alt="logo" />
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
              <a
                style={{ flexDirection: "row", alignItems: "center" }}
                onClick={e => {
                  e.preventDefault()
                  showDropDown(e.target)
                }}
                href="#"
              >
                <li>Programme</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to="/department/general-studies">
                    <li>
                      School of Arts and Social Science
                      {/* <ul className="nav-ul-inner-inner">
                        <a href="#">
                          <Link to="/department/islamic-studies">
                            <li>Department of Islamic Studies</li>
                          </Link>
                          <Link to="/department/social-studies">
                            <li>Department of Social Studeies</li>
                          </Link>
                        </a>
                      </ul> */}
                    </li>
                    <li>
                      School of Languages
                      {/* <ul className="nav-ul-inner-inner">
                        <a href="#">
                          <Link to="/department/arabic">
                            <li>Department of Arabic</li>
                          </Link>
                          <Link to="/department/english">
                            <li>Department of English</li>
                          </Link>
                        </a>
                      </ul> */}
                    </li>
                    <li>
                      School of Sciences
                      {/* <ul className="nav-ul-inner-inner">
                        <a href="#">
                          <Link to="/department/computer">
                            <li>Department of Computer</li>
                          </Link>
                          <Link to="/department/mathematics">
                            <li>Department of Mathematics</li>
                          </Link>
                          <Link to="/department/integrated-science">
                            <li>Integrated Science</li>
                          </Link>
                        </a>
                      </ul> */}
                    </li>
                    <li>
                      School of Education
                      {/* <ul className="nav-ul-inner-inner">
                        <Link to="/department/general-studies">
                          <li>Dept. of General Education</li>
                        </Link>
                      </ul> */}
                    </li>
                  </Link>
                </ul>
              </a>
              <a style={{ flexDirection: "row", alignItems: "center" }} onClick={e => showDropDown(e.target)} href="#">
                <li>Admission</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <a href="#">
                    <li>Pre-NCE</li>
                    <li>NCE</li>
                    <li>Diploma</li>
                  </a>
                </ul>
              </a>
              <a style={{ flexDirection: "row", alignItems: "center" }} onClick={e => showDropDown(e.target)} href="#">
                <li>Portal</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <a href="#">
                    <li>Email</li>
                    <li>Student Portal</li>
                    <li>E-learning</li>
                    <li>Alumni</li>
                  </a>
                </ul>
              </a>

              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li>Library</li>
              </a>
              <Link style={{ flexDirection: "row", alignItems: "center" }} onClick={e => showDropDown(e.target)} href="#">
                <li>About Us</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to="/vision-and-mission">
                    <li>Vision and Mission</li>
                  </Link>
                  <Link to="/history-of-amcoe">
                    <li>History of AMCOE</li>
                  </Link>
                  <Link href="#">
                    <li>Life in AMCOE</li>
                  </Link>
                  <Link href="#">
                    <li>Programmes</li>
                  </Link>
                  <Link href="#">
                    <li>Contact us</li>
                  </Link>
                </ul>
              </Link>
              <a style={{ flexDirection: "row", alignItems: "center" }} onClick={e => showDropDown(e.target)} href="#">
                <li>News</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <a href="#">
                    <li>News Headlines</li>
                  </a>
                  <a href="#">
                    <li>Special Bulletin</li>
                  </a>
                  <a href="#">
                    <li>News and Magazine</li>
                  </a>
                  <a href="#">
                    <li>Symposis</li>
                  </a>
                </ul>
              </a>
              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li className="search-icon">
                  <i class="fas fa-search"></i>
                </li>
              </a>
              <a href="#">
                <Button label={"Resources"} />
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
