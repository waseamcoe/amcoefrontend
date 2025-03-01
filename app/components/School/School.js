import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import Axios from "axios"

import SmallLoading from "../SmallLoading"
import ViewSingleSchool from "./ViewSingleSchool"
import DialogBox from "../../DialogBox"

function School(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [sentRequest, setSentRequest] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditSchool", school: { id: props.id, name: props.name, hod: props.hod, mission: props.mission, vision: props.vision, description: props.description } })
    appDispatch({ type: "openEditSchool" })
  }

  async function handleDelete() {
    setShowDialog(true)
  }

  async function sentDeleteRequest() {
    setIsDeleting(true)
    console.log(props.id)
    try {
      const response = await Axios.post(`${appState.backendURL}/delete-school`, { id: props.id, token: localStorage.getItem("token") })
      if (response.data) {
        appDispatch({ type: "setFlashMessage", message: "School has been successfully deleted" })
        appDispatch({ type: "showSuccessAlert" })
        setIsDeleting(false)
        setSentRequest(false)
        // if delete request is successful, update the state to reflect the change
        props.setState(draft => {
          draft.schools = draft.schools.filter(school => school._id !== props.id)
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
    //         <h4 className="heading-font">{props.name}</h4>
    //       </div>
    //     </div>
    //     <div className="admin-details">
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Dean:</strong> <p className="small-font">{props.hod}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Welcome Message:</strong> <p className="small-font">{props.description}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>School Mission:</strong> <p className="small-font">{props.mission}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>School Vision:</strong> <p className="small-font">{props.vision}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>School:</strong> <p className="small-font">{props.school}</p>
    //         </p>
    //       </div>
    //     </div>
    //     <div className="admin-content-box-button">
    //       <button onClick={handleDelete} className="action-button" style={{ background: "#ff5959", fontWeight: "bold", color: "#fff", border: "none" }}>
    //         {isDeleting ? (
    //           <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBottom={"2px solid transparent"} />
    //         ) : (
    //           <>
    //             <p>Delete</p>
    //             <i className="fas fa-trash"></i>
    //           </>
    //         )}
    //       </button>
    //       <button className="action-button" onClick={handleEdit} style={{ background: "rgb(70, 128, 255)", fontWeight: "bold", color: "#fff", border: "none" }}>
    //         Edit<i className="fas fa-edit"></i>
    //       </button>
    //     </div>
    //   </Link>
    // </div>
    <>
      {showDetail && <ViewSingleSchool name={props.name} description={props.description} mission={props.mission} vision={props.vision} hod={props.hod} setShowDetail={setShowDetail} />}
      {showDialog && <DialogBox data={`Are you sure you want to delete "${props.name}"?`} setShowDialog={setShowDialog} setSentRequest={setSentRequest} />}
      <tr>
        <td title={props.index}>{props.index}</td>
        <td>{props.name}</td>
        <td title={props.description}>
          <p className="text-truncate">{props.description}</p>
        </td>
        {/* <td>
          <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg"} alt="School photo" />
        </td> */}
        <td title={props.mission}>
          <p className="text-truncate">{props.mission}</p>
        </td>
        <td title={props.vision}>
          <p className="text-truncate">{props.vision}</p>
        </td>
        <td title={props.hod}>{props.hod}</td>

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

export default School
