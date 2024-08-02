import React, { useEffect } from "react"
import Footer from "./Footer"
import Navigation from "./Navigation"

function VisionAndMission() {
  // This runs once whenever the page loads, it scroll the window the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navigation />
      <div className="about-cont">
        <div className="about-head">
          <div className="about-head-overlay"></div>
          <h1>Our Vision and Mission</h1>
        </div>
        <div className="about-text-cont about-text-cont2">
          <div className="about-text-flex">
            <div className="sidebar">
              <div className="about-text-h">
                <h2 className="heading-font">Vision Statement</h2>
              </div>
              <div className="about-text-p">
                <p className="text-font">To be outstanding in: (a) the integration of teaching and learning, enhancement of human knowledge through research and scholarship, and (4) leadership in service. The Scholars and Professionals prepared thereby shall provide exemplary educational and related services and leadership to improve the lives of individuals and to contribute to broad human development </p>
              </div>
            </div>
            <div className="sidebar">
              <div className="about-text-h">
                <h2 className="heading-font">Mission Statement</h2>
              </div>
              <div className="about-text-p">
                <p className="text-font">To produce outstanding educators, researchers, and leaders thereby advancing the broadly defined profession of education and enhancing national development. </p>
              </div>
            </div>
          </div>
          <div className="about-text-flex">
            <div className="sidebar">
              <div className="about-text-h">
                <h2 className="heading-font">Goal</h2>
              </div>
              <div className="about-text-p">
                <p className="text-font">To prepare educational professionals recognized for the quality and significance of their teaching, research, scholarship, service, and leadership ii Inculcate goodness to others, sincerity, truthfulness, piety and decency.</p>
                <p className="text-font">Enhance the commitment of staff and students to the values of unity in diversity, justice and peace, and patriotic citizenship.</p>
                <p className="text-font">Develop collaborative, professional relationships with schools, government and non-governmental organizations, and the host and neighbouring communities focused on the improvement of education in schools, communities, and workplace settings. Sustain an environment supportive of teaching, learning and character</p>
                <p className="text-font">building throughout the College. Enhance the effective, efficient and credible management of the College Values: </p>
                <ol>
                  <li className="text-font">Academic excellence and integrity</li>
                  <li className="text-font">Outstanding teaching and service</li>
                  <li className="text-font">Scholarly research and professional leadership</li>
                  <li className="text-font">Diversity, equity, justice and peace</li>
                  <li className="text-font">Collegiality and collaboration</li>
                </ol>
              </div>
            </div>
            <div className="sidebar">
              <div className="about-text-h">
                <h2 className="heading-font">Phylosophy</h2>
              </div>
              <div className="about-text-p">
                <p className="text-font">The overriding philosophy of the College is the production of qualified and competent professional teachers and leaders with a strong religious ground and spirit of patriotism and selfless service to humanity. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VisionAndMission
