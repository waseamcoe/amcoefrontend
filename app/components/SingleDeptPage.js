import React from "react"
import { useParams } from "react-router-dom"
import Footer from "./Footer"
import Navigation from "./Navigation"

function SingleDeptPage() {
  const deptName = useParams()
  return (
    <>
      <Navigation />
      <div className="dept-cont">
        <section className="dept-flex-cont">
          <div className="dept-sidebar1">
            <div className="dept-s1-img-cont">
              <img src="../images/prof.jpeg" />
            </div>
            <div className="dept-s1-caption">
              <h2 className="heading-font">Prof. Ilyasu I. Bawa</h2>
              <p className="text-font">Dean</p>
            </div>
          </div>
          <div className="dept-sidebar2">
            <h2 className="heading-font">Welcome</h2>
            <p className="text-font">It is my great pleasure to welcome you to the Faculty of Art, University of Lagos, the largest Faculty in the University. The Faculty is known for excellence and pace-setting in the areas of Culture, teaching and community development. We provide the platform for our promising graduates to be well equipped with sufficient knowledge to meet the manpower demand in the society and at the same time imbibe the culture of self-employment and job creation.</p>
          </div>
          <div className="dept-sidebar3">
            <h2 className="heading-font">Departments</h2>
            <ul>
              <li>
                <a href="#" className="text-font">
                  Department of Islamic Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-font">
                  Department of social studies
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div className="about-text-cont">
          <div className="about-text-flex">
            <div className="sidebar">
              <div className="about-text-h">
                <h2 className="heading-font">Vision</h2>
              </div>
              <div className="about-text-p">
                <p className="text-font">To be outstanding in: (a) the integration of teaching and learning, enhancement of human knowledge through research and scholarship, and (4) leadership in service. The Scholars and Professionals prepared thereby shall provide exemplary educational and related services and leadership to improve the lives of individuals and to contribute to broad human development </p>
              </div>
            </div>
            <div className="sidebar">
              <div className="about-text-h">
                <h2 className="heading-font">Mission</h2>
              </div>
              <div className="about-text-p">
                <p className="text-font">To produce outstanding educators, researchers, and leaders thereby advancing the broadly defined profession of education and enhancing national development. </p>
              </div>
            </div>
          </div>
          <div className="about-text-flex"></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SingleDeptPage
