import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import Axios from "axios"

import SmallLoading from "../SmallLoading"

function News(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditNews", news: { id: props.id, head: props.head, body: props.body, date: props.date, pic: props.pic } })
    appDispatch({ type: "openEditNews" })
  }

  async function handleDelete() {
    setIsDeleting(true)
    // send delete request to the server
    try {
      const response = await Axios.post(`${appState.backendURL}/delete-news`, { id: props.id })
      if (response.data) {
        setIsDeleting(false)
        // if delete request is successful, update the state to reflect the change
        props.setState(draft => {
          draft.news = draft.news.filter(news => news._id !== props.id)
        })
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="admin-content-box">
      <Link to={`#`}>
        <div className="admin-icon-main-cont">
          <div className="admin-icon-cont">
            <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg" alt="staff photo" />
          </div>
          <div className="admin-content-box-head">
            <h4 className="heading-font">{props.head}</h4>
          </div>
        </div>
        <div className="admin-details">
          <div className="single-detail">
            <p className="text-font">
              <strong>News Content:</strong> <p className="small-font">{props.body}</p>
            </p>
          </div>
          <div className="single-detail">
            <p className="text-font">
              <strong>Created On:</strong>{" "}
              <p className="small-font">
                {new Date(props.date).getDate()}/{new Date(props.date).getMonth() + 1}/{new Date(props.date).getFullYear()}{" "}
              </p>
            </p>
          </div>
        </div>
        <div className="admin-content-box-button">
          <button onClick={handleDelete} className="action-button" style={{ background: "#dc3545", fontWeight: "bold", color: "#fff", border: "none" }}>
            {isDeleting ? (
              <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBottom={"2px solid transparent"} />
            ) : (
              <>
                <i className="fas fa-trash"></i>
                <p>Delete</p>
              </>
            )}
          </button>
          <button className="action-button" onClick={handleEdit} style={{ background: "rgb(70, 128, 255)", fontWeight: "bold", color: "#fff", border: "none" }}>
            <i className="fas fa-edit"></i>Edit
          </button>
        </div>
      </Link>
    </div>
  )
}

export default News
