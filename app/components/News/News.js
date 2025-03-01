import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import Axios from "axios"
import Markdown from "react-markdown"

import SmallLoading from "../SmallLoading"
import DialogBox from "../../DialogBox"
import ViewSingleNews from "./ViewSingleNews"

function News(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [sentRequest, setSentRequest] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditNews", news: { id: props.id, head: props.head, body: props.body, date: props.date, pic: props.pic } })
    appDispatch({ type: "openEditNews" })
  }

  async function handleDelete() {
    setShowDialog(true)
  }

  async function sentDeleteRequest() {
    setIsDeleting(true)
    console.log(props.id)
    try {
      const response = await Axios.post(`${appState.backendURL}/delete-news`, { id: props.id, token: localStorage.getItem("token") })
      if (response.data) {
        appDispatch({ type: "setFlashMessage", message: "News has been successfully deleted" })
        appDispatch({ type: "showSuccessAlert" })
        setIsDeleting(false)
        setSentRequest(false)
        // if delete request is successful, update the state to reflect the change
        props.setState(draft => {
          draft.news = draft.news.filter(news => news._id !== props.id)
        })
      }
    } catch (err) {
      appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
      appDispatch({ type: "showDangerAlert" })
      setIsDeleting(false)
      setSentRequest(false)
    }
  }

  useEffect(() => {
    if (sentRequest) {
      sentDeleteRequest()
    }
  }, [sentRequest])
  return (
    // <div className="admin-content-box">
    //   <Link to={`#`}>
    //     <div className="admin-icon-main-cont">
    //       <div className="admin-icon-cont">
    //         <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg" alt="staff photo" />
    //       </div>
    //       <div className="admin-content-box-head">
    //         <h4 className="heading-font">{props.head}</h4>
    //       </div>
    //     </div>

    //     <div className="admin-details">
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>News Content:</strong>{" "}
    //           <p className="small-font">
    //             <Markdown>{props.body}</Markdown>
    //           </p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Created On:</strong>{" "}
    //           <p className="small-font">
    //             {new Date(props.date).getDate()}/{new Date(props.date).getMonth() + 1}/{new Date(props.date).getFullYear()}{" "}
    //           </p>
    //         </p>
    //       </div>
    //     </div>
    //     <div className="admin-content-box-button">
    //       <button onClick={handleDelete} className="action-button" style={{ background: "#dc3545", fontWeight: "bold", color: "#fff", border: "none" }}>
    //         {isDeleting ? (
    //           <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBottom={"2px solid transparent"} />
    //         ) : (
    //           <>
    //             <i className="fas fa-trash"></i>
    //             <p>Delete</p>
    //           </>
    //         )}
    //       </button>
    //       <button className="action-button" onClick={handleEdit} style={{ background: "rgb(70, 128, 255)", fontWeight: "bold", color: "#fff", border: "none" }}>
    //         <i className="fas fa-edit"></i>Edit
    //       </button>
    //     </div>
    //   </Link>
    // </div>
    <>
      {showDetail && <ViewSingleNews head={props.head} body={props.body} date={props.date} pic={props.pic} setShowDetail={setShowDetail} />}
      {showDialog && <DialogBox data={`Are you sure you want to delete this news?`} setShowDialog={setShowDialog} setSentRequest={setSentRequest} />}
      <tr>
        <td title={props.index}>{props.index}</td>
        <td title={props.head}>
          <p className="text-truncate">{props.head}</p>
        </td>
        <td title={props.body}>
          <p className="text-truncate">{props.body}</p>
        </td>
        <td>
          <p className="text-truncate">
            {new Date(props.date).getDate()}/{new Date(props.date).getMonth() + 1}/{new Date(props.date).getFullYear()}
          </p>
        </td>
        <td>
          <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg"} alt="School photo" />
        </td>
        <td>{props.id}</td>
        <td className="table-actions">
          <div className="action-cont">
            <div className="action-view" title="Detail" onClick={() => setShowDetail(true)}>
              <i className="bx bx-show"></i>
            </div>
            <div className="action-edit" title="Edit" onClick={handleEdit}>
              <i className="bx bx-edit-alt"></i>
            </div>
            <div className="action-delete" title="Delete" onClick={handleDelete}>
              {isDeleting ? <SmallLoading width={"20px"} height={"20px"} borderBottom={"2px solid transparent"} /> : <i className="bx bx-trash"></i>}
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default News
