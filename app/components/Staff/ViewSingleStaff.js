import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

import SmallLoading from "../SmallLoading"

import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

function ViewSingleStaff(props) {
  return (
    <div className="overlay" onClick={() => props.setShowDetail(false)}>
      <div className="admin-content-box">
        <Link to={`#`}>
          <div className="admin-icon-main-cont">
            <div className="admin-icon-cont">
              <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg"} alt="staff photo" />
            </div>
            <div className="admin-content-box-head">
              <h4 className="heading-font">
                {props.firstname} {props.lastname} {props.middlename}
              </h4>
            </div>
          </div>
          <div className="admin-details">
            <div className="single-detail">
              <p className="text-font">
                <strong>Title:</strong> <p className="small-font">{props.title}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Academin bio:</strong> <p className="small-font">{props.acadBio}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Gender:</strong> <p className="small-font">{props.gender}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Email:</strong> <p className="small-font">{props.email}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Role:</strong> <p className="small-font">{props.role}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>School:</strong> <p className="small-font">{props.school}</p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Department:</strong> <p className="small-font">{props.department}</p>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ViewSingleStaff
