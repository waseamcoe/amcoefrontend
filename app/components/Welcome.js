import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import Button from "./ReusableComp/Button"
import SmallLoading from "./SmallLoading"

function Welcome() {
  const appState = useContext(StateContext)
  // fetched all school detail in the database
  async function getNews() {
    Axios.get(`${appState.backendURL}/admin/dashboard/news-limit`)
      .then(response => {
        setNews(response.data)
      })
      .catch(err => {
        if (err.message === "Network Error") {
          appDispatch({ type: "setFlashMessage", message: "Check your newtwork and try again later" })
          appDispatch({ type: "showDangerAlert" })
        } else {
          appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
          appDispatch({ type: "showDangerAlert" })
        }
      })
  }
  return (
    <>
      <div className="welcome-content-container">
        <div className="welcome-description">
          <div className="welcome-description-img">
            <div className="welcome-desc-img-cont">
              <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/q_10/v1722424708/amcoe31-removebg-preview_z3dkbm.png" />
            </div>
            <div className="provost-name">
              <h3 className="heading-font">Professor. Ibrahim Haruna al-Wasewi</h3>
              <p className="text-font">Provost AMCOE Wase</p>
            </div>
          </div>
          <p className="text-font">Wase Local Government Area and its environs are highly educationally disadvantaged. The 12th Emir of Wase, HRH Alhaji Abdullahi Maikano who laid an exemplary penchant for community based educational and infrastructural development initiated the establishment of JNI school in Wase. The 13th Emir, HRH, Dr. Haruna Abdullahi continued the good work and established the JNI Primary and Secondary Schools. By the early 2010 the Federal Government made the far reaching declaration that the Nigeria Certificate of Education (NCE) was henceforth the minimum requirement for teaching in the primary schools in the country with Five Million Naira non-refundable application fee for the establishment of the NCCE awarding Abdullahi Maikano College of Education, Wase...</p>
          {/* <button className="resource">Read More</button> */}
          <Link to={"/history-of-amcoe"}>
            <Button label={"Read More"} />
          </Link>
        </div>

        <div className="campus-spotlight">
          {appState.allNews.length ? (
            <>
              <div className="content-headers">
                <h1 className="headings">
                  Campus Spotlight <i class="fa-solid fa-rss"></i>
                </h1>
              </div>
              <div className="welcome-description-img" style={{ float: "none", margin: 0, width: "100%", marginBottom: "20px", height: "200px" }}>
                {appState.allNews[0].pic ? <img src={`${appState.allNews[0].pic}`} /> : <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/q_10/v1722247565/amco5_xfj8dr.jpg" />}
              </div>
              <div>
                <p className="text-font text-truncate">{appState.allNews[0].body}</p>
                <Link className="button" to={`/news/${appState.allNews[0]._id}`}>
                  Read more...
                </Link>
              </div>
            </>
          ) : (
            <SmallLoading position="relative" top="100%" heigth="100px" />
          )}
        </div>
      </div>
    </>
  )
}

export default Welcome
