import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import Markdown from "react-markdown"

function ViewSingleNews(props) {
  return (
    <div className="overlay" onClick={() => props.setShowDetail(false)}>
      <div className="admin-content-box">
        <Link to={`#`}>
          <div className="admin-icon-main-cont">
            <div className="admin-icon-cont">
              <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg"} alt="staff photo" />
            </div>
            <div className="admin-content-box-head">
              <h4 className="heading-font">{props.head}</h4>
            </div>
          </div>
          <div className="admin-details">
            <div className="single-detail">
              <p className="text-font">
                <strong>Body:</strong>{" "}
                <p className="small-font">
                  <Markdown>{props.body}</Markdown>
                </p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Date:</strong>{" "}
                <p className="small-font">
                  {new Date(props.date).getDate()}/{new Date(props.date).getMonth() + 1}/{new Date(props.date).getFullYear()}
                </p>
              </p>
            </div>
            <div className="single-detail">
              <p className="text-font">
                <strong>Image URL:</strong> <p className="small-font">{props.pic}</p>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ViewSingleNews
