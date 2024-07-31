import React from "react"

function CourseCategories() {
  return (
    <div className="category-cont">
      <div className="category-head">
        <h1 className="heading-font">Programmes</h1>
      </div>
      <div className="category-flex-container">
        <div className="category-flex-box">
          <a href="#">
            <div className="category-icon-cont">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">School of Arts and social Sciences</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                2 Departments<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
        <div className="category-flex-box">
          <a href="#">
            <div className="category-icon-cont">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">School of Languages</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                2 Departments<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
        <div className="category-flex-box">
          <a href="#">
            <div className="category-icon-cont">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">School of Science</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                5 Departments<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
        <div className="category-flex-box">
          <a href="#">
            <div className="category-icon-cont">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">School of Education</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                2 Departments<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CourseCategories
