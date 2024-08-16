import React, { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"

// components
import Footer from "./Footer"
import Navigation from "./Navigation"
import SmallLoading from "./SmallLoading"
import StateContext from "../StateContext"

function SingleSchoolPage() {
  const [departments, setDepartments] = useState([])
  const appState = useContext(StateContext)
  const url = appState.backendURL
  const deptName = useParams()
  const [courseDetail, setCourseDetail] = useState(null)
  const [error, setError] = useState(false)

  // fetched relevant school detail in the database
  async function getSchoolDetails() {
    try {
      const response = await Axios.get(`${url}/school/${deptName.id}`)
      document.title = `${response.data.name}`
      setCourseDetail(response.data)
    } catch (error) {
      setError(true)
      console.log(error.message)
    }
  }

  // fetch this schools department
  async function getSchoolDepartmentById() {
    Axios.get(`${url}/get-school-departments/${deptName.id}`)
      .then(response => {
        setDepartments(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // setting the title for this page
  useEffect(() => {
    window.scrollTo(0, 0)
    getSchoolDetails()
  }, [])

  useEffect(() => {
    setCourseDetail(null)
    getSchoolDetails()
    getSchoolDepartmentById()
  }, [deptName])

  return (
    <>
      <Navigation />
      {courseDetail ? (
        <div className="dept-cont">
          <section className="dept-flex-cont">
            <div className="dept-sidebar1">
              <div className="dept-s1-img-cont">
                <img src={courseDetail.staff.pic ? courseDetail.staff.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg"} alt="Picture of the HOD" />
              </div>
              <div className="dept-s1-caption">
                <h2 className="heading-font">{`${courseDetail.staff.title}. ${courseDetail.staff.firstname} ${courseDetail.staff.middlename ? courseDetail.staff.middlename : ""} ${courseDetail.staff.lastname}`}</h2>
                <p className="text-font">{courseDetail.staff.role}</p>
              </div>
            </div>
            <div className="dept-sidebar2">
              <h2 className="heading-font">Welcome to the {courseDetail.name}</h2>
              <p className="text-font">{courseDetail.description}</p>
            </div>
            <div className="dept-sidebar3">
              <h2 className="heading-font">Departments</h2>
              {departments.length ? (
                <ul>
                  {departments.map(dept => (
                    <li>
                      <Link to={`/department/${dept._id}`} className="text-font">
                        {dept.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <SmallLoading width={"30px"} height={"30px"} />
                  <p className="text-font" style={{ textAlign: "center" }}>
                    Getting departments...
                  </p>
                </>
              )}
            </div>
          </section>
          <div className="about-text-cont about-text-cont2">
            <div className="about-text-flex">
              <div className="sidebar">
                <div className="about-text-h">
                  <h2 className="heading-font">Vision</h2>
                </div>
                <div className="about-text-p">
                  <p className="text-font">{courseDetail.vision}</p>
                </div>
              </div>
              <div className="sidebar">
                <div className="about-text-h">
                  <h2 className="heading-font">Mission</h2>
                </div>
                <div className="about-text-p">
                  <p className="text-font">{courseDetail.mission}</p>
                </div>
              </div>
            </div>
            <div className="about-text-flex"></div>
          </div>
        </div>
      ) : (
        <SmallLoading />
      )}
      {courseDetail ? <Footer /> : ""}
    </>
  )
}

export default SingleSchoolPage
