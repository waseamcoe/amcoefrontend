import React, { useEffect, useRef, useState } from "react"
import { useImmer } from "use-immer"
import Button from "./ReusableComp/Button"

export default function Slider() {
  const slides = useRef(null)
  const [state, setState] = useImmer({
    startSlideShow: false,
    counter: 0,
    numberOfSlides: 0,
  })

  function slideNext() {
    let prevElem = Array.from(slides.current.children[state.counter].children[1].children)
    if (state.counter <= 3 - 1) {
      let animElems = Array.from(slides.current.children[state.counter + 1].children[1].children)
      animElems.forEach(elem => {
        elem.classList.add("animate")
      })
      setState(draft => {
        draft.counter++
      })
    } else {
      setState(draft => {
        draft.counter = 0
      })
    }
    if (state.counter < 3) {
      prevElem.forEach(elem => {
        elem.classList.replace("animate", "none")
      })
    } else {
      Array.from(slides.current.children[0].children[1].children).forEach(elem => {
        elem.classList.add("animate")
      })
      Array.from(slides.current.children[state.counter].children[1].children).forEach(elem => {
        elem.classList.replace("animate", "none")
      })
    }
  }

  function slidePrev() {
    if (state.counter >= 0 + 1) {
      setState(draft => {
        draft.counter--
      })
    }
  }

  function endTransition(elem) {
    // do something
  }

  useEffect(() => {
    let slideArray = Array.from(slides.current.children)
    slideArray.forEach(elem => {
      elem.style.transform = `translateX(-${state.counter * 100}%)`
    })
  }, [state.counter])

  useEffect(() => {
    const delay = setTimeout(() => {
      slideNext()
    }, 5000)
    return () => clearTimeout(delay)
  }, [state.counter])

  return (
    <div className="slider-container">
      <div className="next" onClick={slideNext}>
        <i className="fa-solid fa-angle-right"></i>
      </div>{" "}
      {/* For the next button */}
      <div className="prev" onClick={slidePrev}>
        <i className="fa-solid fa-angle-left"></i>
      </div>{" "}
      {/* For the previous button */}
      <div className="slides" ref={slides}>
        <div className="slider">
          <div className="overlay"></div> {/* {For the overlay} */}
          <div className="background-description">
            <h1 className="animate">Matriculation Ceremony</h1>
            <p className="text-font animate">A group picture of our lectures at the matriculation of our newly admitted students. A group picture of our lectures at the school. A group picture of our lectures at the school.</p>
            <Button myclass={"animate"} label={"Learn More"} />
          </div>
          <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722247571/amcoe14_hhuwbm.jpg" />
        </div>

        <div className="slider" onTransitionEnd={() => endTransition(this)}>
          <div className="overlay"></div> {/* {For the overlay} */}
          <div className="background-description">
            <h1>Meet Our Students</h1>
            <p className="text-font">AMCOE Wase students cross section at Matriculation Ceremony</p>
            <Button label={"Learn More"} />
          </div>
          <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722247570/amcoe26_au3tyh.jpg" />
        </div>

        <div className="slider">
          <div className="overlay"></div> {/* {For the overlay} */}
          <div className="background-description">
            <h1>Wase Juku</h1>
            <p className="text-font">Wase Jukun Cultural Dance at the College Matriculation Ceremony</p>
            <Button label={"Learn More"} />
          </div>
          <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722247567/amcoe20_srfqru.jpg" />
        </div>

        <div className="slider">
          <div className="overlay"></div> {/* {For the overlay} */}
          <div className="background-description">
            <h1>10th Matriculation</h1>
            <p className="text-font">During our last convention. A group picture of our lectures at the school. A group picture of our lectures at the school.</p>
            <Button label={"Learn More"} />
          </div>
          <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722247565/amco5_xfj8dr.jpg" />
        </div>
      </div>
    </div>
  )
}
