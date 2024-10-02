import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"

import SmallLoading from "../components/SmallLoading"
import { useImmer } from "use-immer"

function CourseCategories() {
  const appState = useContext(StateContext)
  const [schools, setSchools] = useState(null)
  const [error, setError] = useImmer({
    hasError: false,
    errorMessage: "",
  })

  // fetched all school detail in the database
  async function getSchools() {
    try {
      const response = await Axios.get(`${appState.backendURL}`)
      setSchools(response.data)
    } catch (error) {
      if (error.message === "Network Error") {
        setError(draft => {
          draft.errorMessage = "We ran into a problem, please check your network and try again"
          draft.hasError = true
        })
      }
    }
  }

  useEffect(() => {
    getSchools()
  }, [])

  return (
    <div className="category-cont">
      <div className="category-head">
        <h1 className="heading-font">Programmes</h1>
      </div>
      <div className="category-flex-container">
        {schools ? (
          schools.map(school => (
            <div className="category-flex-box">
              <Link to={`/school/${school._id}`}>
                <div className="category-icon-cont">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="category-icon-label">
                  <h4 className="heading-font">{school.name}</h4>
                </div>
                <div className="category-text">
                  <p className="text-font">
                    View Departments<i className="fa-solid fa-arrow-right"></i>
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <SmallLoading message="Getting Details..." />
        )}
      </div>
    </div>
  )
}

export default CourseCategories
