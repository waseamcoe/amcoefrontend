import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"

function ViewSingleSchool(props) {
  return (
    <div className="overlay" onClick={() => props.setShowDetail(false)}>
      <div className="admin-content-box">
        <Link to={`#`}>
          <div className="admin-icon-main-cont">
            <div className="admin-icon-cont">
              <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg"} alt="staff photo" />
            </div>
            <div className="admin-content-box-head">
              <h4 className="heading-font">{props.name}</h4>
            </div>
          </div>
          <div className="admin-details">
            <div className="single-detail">
              <p className="text-font">
                <strong>HOD:</strong> <p className="small-font">{props.hod}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Description:</strong> <p className="small-font">{props.description}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Mission:</strong> <p className="small-font">{props.mission}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Vision:</strong> <p className="small-font">{props.vision}</p>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ViewSingleSchool
