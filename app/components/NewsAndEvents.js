import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import Axios from "axios"

import Button from "./ReusableComp/Button"
import SmallLoading from "./SmallLoading"

function NewsAndEvents() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const [counter, setCounter] = useState(0)
  const [news, setNews] = useState([])
  const newsBox = useRef(null)

  const slideContainer = useRef(null)

  const disableButton = { color: "grey" }

  function slideNext() {
    // console.log(newsBox.current)
    if (window.innerWidth < 500) {
      if (counter <= 5) {
        slideContainer.current.style.left = `-${counter * 100}%`
        setCounter(counter + 1)
      } else {
        setCounter(0)
      }
    } else {
      if (counter <= 1) {
        slideContainer.current.style.left = `-${counter * 100}%`
        setCounter(counter + 1)
      } else {
        setCounter(0)
      }
    }
  }

  function slidePrev() {
    if (window.innerWidth < 500) {
      if (counter >= 0) {
        setCounter(counter - 1)
        slideContainer.current.style.left = `-${counter * 100}%`
        console.log(counter)
      } else {
        setCounter(0)
      }
    }
  }

  // fetched all school detail in the database
  async function getNews() {
    Axios.get(`${appState.backendURL}/admin/dashboard/news-limit`)
      .then(response => {
        setNews(response.data)
        appDispatch({ type: "setNews", data: response.data })
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

  useEffect(() => {
    slideNext()
    getNews()
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      slideNext()
    }, 4000)
    return () => clearTimeout(delay)
  }, [counter])
  return (
    <>
      <section className="news-cont">
        <div className="">
          <h1 className="headings news-headidng">News and Events</h1>
        </div>
        <div ref={slideContainer} className="news-flex">
          {news.length ? (
            news.map(news => (
              <div ref={newsBox} className="news-box">
                <Link to={`/news/${news._id}`}>
                  <div className="news-img-cont">
                    <img src={news.pic} />
                  </div>
                  <div className="new-head-cont">
                    <h2 className="heading-font">{news.head}</h2>
                  </div>
                  <div className="new-para-cont">
                    <p className="text-font">{news.body}</p>
                  </div>
                  <div className="news-date">
                    <div className="news-date-inner">
                      <h3 className="heading-font">{new Date(news.date).getDate()}</h3>
                      <p className="text-font">{new Date(news.date).toLocaleDateString("default", { month: "short" })}</p>
                    </div>
                  </div>
                  <div className="news-btn">
                    <Button label={"Read More"} />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <SmallLoading />
          )}
        </div>
        <div className="news-nav">
          <div style={counter <= 0 ? disableButton : {}} onClick={slidePrev} className="news-prev">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div style={counter >= 4 ? disableButton : {}} onClick={slideNext} className="news-next">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewsAndEvents
