import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

import SmallLoading from "../SmallLoading"

import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

function Staff(Props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditUser", user: { id: Props.id, title: Props.title, firstname: Props.firstname, lastname: Props.lastname, middlename: Props.middlename, email: Props.email, acadBio: Props.acadBio, gender: Props.gender, role: Props.role, school: Props.school, department: Props.department } })
    appDispatch({ type: "openEdit" })
  }

  async function handleDelete() {
    setIsDeleting(true)
    // send delete request to the server
    try {
      const response = await Axios.post(`${appState.backendURL}/delete-staff`, { id: Props.id })
      if (response.data) {
        setIsDeleting(false)
        // if delete request is successful, update the state to reflect the change
        Props.setState(draft => {
          draft.staff = draft.staff.filter(staff => staff._id !== Props.id)
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
            <img src={Props.pic ? Props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg"} alt="staff photo" />
          </div>
          <div className="admin-content-box-head">
            <h4 className="heading-font">
              {Props.firstname} {Props.lastname} {Props.middlename}
            </h4>
          </div>
        </div>
        <div className="admin-details">
          <div className="single-detail">
            <p className="text-font">
              <strong>Academin bio:</strong> <p className="small-font">{Props.acadBio}</p>
            </p>
          </div>
          <div className="single-detail">
            <p className="text-font">
              <strong>Gender:</strong>{" "}
              <p className="small-font">
                {Props.gender}
                {Props.sex}
              </p>
            </p>
          </div>
          <div className="single-detail">
            <p className="text-font">
              <strong>Role:</strong> <p className="small-font">{Props.role}</p>
            </p>
          </div>
          <div className="single-detail">
            <p className="text-font">
              <strong>School:</strong> <p className="small-font">{Props.school}</p>
            </p>
          </div>
          <div className="single-detail">
            <p className="text-font">
              <strong>Department:</strong> <p className="small-font">{Props.department}</p>
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

export default Staff
