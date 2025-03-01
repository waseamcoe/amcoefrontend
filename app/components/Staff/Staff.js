import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

import SmallLoading from "../SmallLoading"
import ViewSingleStaff from "./ViewSingleStaff"
import DialogBox from "../../DialogBox"

import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

function Staff(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [sentRequest, setSentRequest] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditUser", user: { id: props.id, title: props.title, firstname: props.firstName, lastname: props.lastName, middlename: props.middleName, pic: props.pic, email: props.email, acadBio: props.acadBio, gender: props.gender, role: props.role, school: props.school, department: props.department } })
    appDispatch({ type: "openEdit" })
  }

  async function handleDelete() {
    setShowDialog(true)
  }

  async function sentDeleteRequest() {
    setIsDeleting(true)
    console.log(props.id)
    try {
      const response = await Axios.post(`${appState.backendURL}/delete-staff`, { id: props.id, token: localStorage.getItem("token") })
      if (response.data) {
        appDispatch({ type: "setFlashMessage", message: "Staff profile has been successfully deleted" })
        appDispatch({ type: "showSuccessAlert" })
        setIsDeleting(false)
        setSentRequest(false)
        // if delete request is successful, update the state to reflect the change
        props.setState(draft => {
          draft.staff = draft.staff.filter(staff => staff._id !== props.id)
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
    //         <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg"} alt="staff photo" />
    //       </div>
    //       <div className="admin-content-box-head">
    //         <h4 className="heading-font">
    //           {props.firstname} {props.lastname} {props.middlename}
    //         </h4>
    //       </div>
    //     </div>
    //     <div className="admin-details">
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Title:</strong> <p className="small-font">{props.title}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Academin bio:</strong> <p className="small-font">{props.acadBio}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Gender:</strong> <p className="small-font">{props.gender}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Email:</strong> <p className="small-font">{props.email}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Role:</strong> <p className="small-font">{props.role}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>School:</strong> <p className="small-font">{props.school}</p>
    //         </p>
    //       </div>
    //       <div className="single-detail">
    //         <p className="text-font">
    //           <strong>Department:</strong> <p className="small-font">{props.department}</p>
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
      {showDetail && <ViewSingleStaff title={props.title} pic={props.pic} firstname={props.firstName} lastname={props.lastName} middlename={props.middleName} acadBio={props.acadBio} gender={props.gender} email={props.email} role={props.role} school={props.school} department={props.department} setShowDetail={setShowDetail} />}
      {showDialog && <DialogBox data={`Are you sure you want to delete the staff "${props.firstName} ${props.lastName}"?`} setShowDialog={setShowDialog} setSentRequest={setSentRequest} />}
      <tr>
        <td title={props.index}>{props.index}</td>
        <td title={props.title}>{props.title}</td>
        <td>
          <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg"} alt="staff photo" />
        </td>
        <td title={`${props.firstName} ${props.lastName} ${props.middleName}`}>
          {props.firstName} {props.lastName} {props.middleName}
        </td>
        <td title={props.role}>{props.role}</td>
        <td title={props.gender}>{props.gender}</td>
        <td title={props.department}>{props.department}</td>
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

export default Staff
