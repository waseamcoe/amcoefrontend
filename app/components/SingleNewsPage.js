import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import Axios from "axios"
import Markdown from "react-markdown"
import { CSSTransition } from "react-transition-group"

import Footer from "./Footer"
import Navigation from "./Navigation"
import SmallLoading from "./SmallLoading"
import FlashMessage from "./ReusableComp/FlashMessage"

function SingleNewsPage(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const newsId = useParams()
  const [newsDetail, setNewsDetail] = useState(null)
  const url = appState.backendURL

  // functions
  // fetched relevant news detail in the database
  async function getNewsDetails() {
    try {
      const response = await Axios.get(`${url}/news/${newsId.id}`)
      document.title = `${response.data.head}`
      setNewsDetail(response.data)
    } catch (error) {
      appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
      appDispatch({ type: "showDangerAlert" })
    }
  }

  // fetched relevant annoucement detail in the database
  async function getAnnoucementDetails() {
    try {
      const response = await Axios.get(`${url}/annoucement/${newsId.id}`)
      document.title = `${response.data.head}`
      setNewsDetail(response.data)
    } catch (error) {
      appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
      appDispatch({ type: "showDangerAlert" })
    }
  }

  // components effets
  useEffect(() => {
    scrollTo(0, 0)
    if (props.isNews) {
      getNewsDetails()
    } else {
      getAnnoucementDetails()
    }
  }, [])
  return (
    <>
      <CSSTransition in={appState.alertDanger || appState.alertSucess} timeout={300} classNames={"show-flash"} unmountOnExit>
        <FlashMessage message={appState.flashMessage} myclass={appState.alertDanger ? "alert-danger" : "alert-success"} />
      </CSSTransition>
      <Navigation />
      <div className="news-container">
        <div className="news-loc">
          <Link to={"/"}>
            <p className="text-font">Home</p>
          </Link>
          <Link to={"#"}>
            <p className="text-font">|</p>
          </Link>
          <Link to={"#"}>
            <p className="text-font">News and Events</p>
          </Link>
        </div>
        {newsDetail ? (
          <div className="news-content-cont">
            <div className="news-heading">
              <h1 className="heading-font">{newsDetail.head}</h1>
            </div>
            <div className="news-pic">
              <div className="news-pic-cont">
                <img src={newsDetail.pic} alt="News Image" />
              </div>
              <div className="news-pic-caption">
                <p>Image Caption</p>
              </div>
            </div>
            <div className="news-date-cont">
              <div className="news-date-single">
                <p className="text-font">
                  {new Date(newsDetail.date).getDate()} {new Date(newsDetail.date).toLocaleDateString("default", { month: "short" })}, {new Date(newsDetail.date).getFullYear()}
                </p>
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
              <Markdown>{newsDetail.body}</Markdown>
            </div>
          </div>
        ) : (
          <SmallLoading />
        )}
      </div>

      {newsDetail ? <Footer /> : ""}
    </>
  )
}

export default SingleNewsPage
