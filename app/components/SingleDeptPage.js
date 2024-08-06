import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
const url = "https://waseamcoe.onrender.com"

// components
import Footer from "./Footer"
import Navigation from "./Navigation"
import SmallLoading from "./SmallLoading"

function SingleDeptPage() {
  const deptName = useParams()
  const [courseDetail, setCourseDetail] = useState(null)

  // fetched relevant school detail in the database
  async function getSchoolDetails() {
    try {
      const response = await Axios.get(`${url}/school/${deptName.name}`)
      setCourseDetail(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  // setting the title for this page
  useEffect(() => {
    document.title = `AMCOE | ${deptName.name}`
    window.scrollTo(0, 0)
    getSchoolDetails()
  }, [])

  useEffect(() => {
    setCourseDetail(null)
    getSchoolDetails()
  }, [deptName])

  return (
    <>
      <Navigation />
      {courseDetail ? (
        <div className="dept-cont">
          <section className="dept-flex-cont">
            <div className="dept-sidebar1">
              <div className="dept-s1-img-cont">
                <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg" alt="Picture of the HOD" />
              </div>
              <div className="dept-s1-caption">
                <h2 className="heading-font">{`${courseDetail.staff.firstname} ${courseDetail.staff.middlename} ${courseDetail.staff.lastname}`}</h2>
                <p className="text-font">{courseDetail.staff.portfolio}</p>
              </div>
            </div>
            <div className="dept-sidebar2">
              <h2 className="heading-font">Welcome</h2>
              <p className="text-font">{courseDetail.description}</p>
            </div>
            <div className="dept-sidebar3">
              <h2 className="heading-font">Departments</h2>
              <ul>
                {courseDetail.departments.map(dept => (
                  <li>
                    <Link to={dept.toLowerCase()} className="text-font">
                      {dept}
                    </Link>
                  </li>
                ))}
              </ul>
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

export default SingleDeptPage
