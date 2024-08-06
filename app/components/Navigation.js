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

  return (
    <>
      {/* <div onClick={closeCurrentTab} className="nav-overlay"></div> */}
      <div className="header">
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
                  <Link to="/school/Arts">
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
                  </Link>
                  <Link to="/school/Languages">
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
                  </Link>
                  <Link to="/school/Sciences">
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
                  </Link>
                  <Link to="/school/Education">
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
                </ul>
              </Link>
              <a style={{ flexDirection: "row", alignItems: "center" }} href="#">
                <li>Portal</li>
                <i className="fa-solid fa-angle-right"></i>
                <ul className="nav-ul-inner">
                  <Link to={"/email"}>
                    <li>Email</li>
                  </Link>
                  <Link to={"/student/portal"}>
                    <li>Student Portal</li>
                  </Link>
                  <Link to={"/student/elearning"}>
                    <li>E-learning</li>
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
