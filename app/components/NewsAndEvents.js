import React, { useEffect, useRef, useState } from "react"

function NewsAndEvents() {
  const [counter, setCounter] = useState(0)

  const slideContainer = useRef(null)

  const disableButton = { color: "grey" }

  function slideNext() {
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

  useEffect(() => {
    slideNext()
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
        <div className="headings">
          <h2 className="headings news-headidng">News and Events</h2>
        </div>
        <div ref={slideContainer} className="news-flex">
          <div className="news-box">
            <div className="news-img-cont">
              <img src="https://educator.qodeinteractive.com/wp-content/uploads/2017/07/h3-image-2.jpg" />
            </div>
            <div className="new-head-cont">
              <h2 className="heading-font">Graduate Admission</h2>
            </div>
            <div className="new-para-cont">
              <p className="text-font">Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
            </div>
          </div>
          <div className="news-box">
            <div className="news-img-cont">
              <img src="../images/amco5.jpeg" />
            </div>
            <div className="new-head-cont">
              <h2 className="heading-font">JAMB Approval</h2>
            </div>
            <div className="new-para-cont">
              <p className="text-font">Abdullahi Mai-kano is now on JAMB portal, we have been accredired and approved by JAMB. You can now select AMCO wase as your first choice during your JAMB registration</p>
            </div>
          </div>
          <div className="news-box">
            <div className="news-img-cont">
              <img src="https://educator.qodeinteractive.com/wp-content/uploads/2017/07/h3-image-4.jpg" />
            </div>
            <div className="new-head-cont">
              <h2 className="heading-font">Graduate Admission</h2>
            </div>
            <div className="new-para-cont">
              <p className="text-font">Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
            </div>
          </div>
          <div className="news-box">
            <div className="news-img-cont">
              <img src="https://educator.qodeinteractive.com/wp-content/uploads/2017/07/h3-image-2.jpg" />
            </div>
            <div className="new-head-cont">
              <h2 className="heading-font">Graduate Admission</h2>
            </div>
            <div className="new-para-cont">
              <p className="text-font">Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
            </div>
          </div>
          <div className="news-box">
            <div className="news-img-cont">
              <img src="../images/amco5.jpeg" />
            </div>
            <div className="new-head-cont">
              <h2 className="heading-font">JAMB Approval</h2>
            </div>
            <div className="new-para-cont">
              <p className="text-font">Abdullahi Mai-kano is now on JAMB portal, we have been accredired and approved by JAMB. You can now select AMCO wase as your first choice during your JAMB registration</p>
            </div>
          </div>
          <div className="news-box">
            <div className="news-img-cont">
              <img src="https://educator.qodeinteractive.com/wp-content/uploads/2017/07/h3-image-4.jpg" />
            </div>
            <div className="new-head-cont">
              <h2 className="heading-font">Graduate Admission</h2>
            </div>
            <div className="new-para-cont">
              <p className="text-font">Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
            </div>
          </div>
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
