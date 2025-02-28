import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import Axios from "axios"

import SmallLoading from "../SmallLoading"
import DialogBox from "../../DialogBox"
import ViewSingleDepartment from "./ViewSingleDepartment"

function Department(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditDepartment", department: { id: props.id, name: props.name, hod: props.hod, mission: props.mission, vision: props.vision, description: props.description } })
    appDispatch({ type: "openEditDepartment" })
  }

  async function handleDelete() {
    setIsDeleting(true)
    // send delete request to the server
    try {
      let sure = confirm(`Are you sure you want to delete ${props.name}`)
      if (sure) {
        const response = await Axios.post(`${appState.backendURL}/delete-department`, { id: props.id, token: localStorage.getItem("token") })
        if (response.data) {
          // if delete request is successful, update the state to reflect the change and show flash message
          appDispatch({ type: "setFlashMessage", message: "Department has been successfully deleted" })
          appDispatch({ type: "showSuccessAlert" })
          setIsDeleting(false)
          props.setState(draft => {
            draft.departments = draft.departments.filter(department => department._id !== props.id)
          })
        }
      }
    } catch (err) {
      appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
      appDispatch({ type: "showDangerAlert" })
      setIsDeleting(false)
    }
  }
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
    //         <div className="text-font">
    //           <strong>Head of Department:</strong> <p className="small-font">{props.hod}</p>
    //         </div>
    //       </div>
    //       <div className="single-detail">
    //         <div className="text-font">
    //           <strong>Welcome Message:</strong> <p className="small-font">{props.description}</p>
    //         </div>
    //       </div>
    //       <div className="single-detail">
    //         <div className="text-font">
    //           <strong>Department Mission:</strong> <p className="small-font">{props.mission}</p>
    //         </div>
    //       </div>
    //       <div className="single-detail">
    //         <div className="text-font">
    //           <strong>Department Vision:</strong> <p className="small-font">{props.vision}</p>
    //         </div>
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
      {showDetail && <ViewSingleDepartment name={props.name} description={props.description} mission={props.mission} vision={props.vision} hod={props.hod} setShowDetail={setShowDetail} />}
      {showDialog && <DialogBox data={`Are you sure you want to delete "${props.name}"?`} setShowDialog={setShowDialog} setSentRequest={setSentRequest} />}
      <tr>
        <td>{props.index}</td>
        <td>{props.name}</td>
        <td>
          <p className="text-truncate">{props.description}</p>
        </td>
        {/* <td>
          <img src={props.pic ? props.pic : "https://res.cloudinary.com/dmw39pbxq/image/upload/v1723382045/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549_yuzary.jpg"} alt="School photo" />
        </td> */}
        <td>
          <p className="text-truncate">{props.mission}</p>
        </td>
        <td>
          <p className="text-truncate">{props.vision}</p>
        </td>
        <td>{props.hod}</td>

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

export default Department
