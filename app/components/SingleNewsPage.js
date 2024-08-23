import React from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import Navigation from "./Navigation"

function SingleNewsPage() {
  return (
    <>
      <Navigation />
      <div className="news-container">
        <div className="news-loc">
          <Link to={"/"}>
            <p className="text-font">Home</p>
          </Link>
          <Link to={"/"}>
            <p className="text-font">News and Events</p>
          </Link>
        </div>
        <div className="news-content-cont">
          <div className="news-heading">
            <h1 className="heading-font">Nigeria Immigration Service visits for collaboration</h1>
          </div>
          <div className="news-pic">
            <div className="news-pic-cont">
              <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/q_20/v1722247572/amcoe16_d5wzfl.jpg" alt="News Image" />
            </div>
            <div className="news-pic-caption">
              <p>A police officer searches a masked person in Walthamstow, east London</p>
            </div>
          </div>
          <div className="news-date-cont">
            <div className="news-date-single">
              <p className="text-font">21 Aug, 2024</p>
            </div>

            <div className="logo-container">
              <div className="logo-container-inner">
                <div className="facebook-container">
                  <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710277834/fb_qvh7ap.png" alt="facebook" />
                </div>
                <div className="twitter-container">
                  <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710277833/tw_wu1v6i.png" alt="twitter" />
                </div>
                <div className="facebook-container">
                  <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710323103/intagram_w4crtj.jpg" alt="facebook" />
                </div>
                <div className="facebook-container">
                  <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1710323199/youtube-icon-2048x2048-wiwalbpx_vnf1xu.png" alt="facebook" />
                </div>
              </div>
            </div>
          </div>
          <div className="news-body">
            <p className="text-font">A Pakistani man has appeared in court to face charges of cyber-terrorism after allegedly spreading disinformation on his clickbait website thought to have fuelled anti-immigration riots in the United Kingdom.</p>
            <p className="text-font">Farhan Asif was accused of publishing an article on his Channel3Now website falsely claiming that a Muslim asylum seeker was suspected of a deadly knife attack which killed three girls – aged six, seven and nine – at a Taylor Swift-themed dance and yoga session for children in Southport.</p>
            <p className="text-font">Farhan Asif was accused of publishing an article on his Channel3Now website falsely claiming that a Muslim asylum seeker was suspected of a deadly knife attack which killed three girls – aged six, seven and nine – at a Taylor Swift-themed dance and yoga session for children in Southport.</p>
            <p className="text-font">Speaking on Building The Human Resource and Infrastructure for Oncogenic Health, Dr. Owonikoko, a former Resident at CMUL, reported on the prognosis by the World Health Organisation (WHO) which indicates that, for the past three decades, there has been a rise in cases of Non-Communicable Diseases in Africa. According to the reference he made, “between now and 2040, Cancer diagnoses and death are projected to increase on the African continent”.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default SingleNewsPage
