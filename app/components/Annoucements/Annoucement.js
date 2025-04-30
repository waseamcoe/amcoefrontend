import React, { useContext, useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import Axios from "axios"
// import Markdown from "react-markdown"

import SmallLoading from "../SmallLoading"
import DialogBox from "../../DialogBox"
import ViewSingleAnnoucement from "./ViewSingleAnnoucement"
import { proposalPlugins } from "@babel/preset-env/lib/shipped-proposals"

function Annoucement(props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [sentRequest, setSentRequest] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  // functions
  function handleEdit() {
    // Update the app state user too the selected user and open the edit overlay
    appDispatch({ type: "setEditAnnoucement", annoucement: { id: props.id, head: props.head, body: props.body, date: props.date, pic: props.pic, announceNotification: props.announceNotification } })
    appDispatch({ type: "openEditAnnoucement" })
  }

  async function handleDelete() {
    setShowDialog(true)
  }

  async function sentDeleteRequest() {
    setIsDeleting(true)
    try {
      const response = await Axios.post(`${appState.backendURL}/delete-annoucement`, { id: props.id, token: localStorage.getItem("token") })
      if (response.data) {
        appDispatch({ type: "setFlashMessage", message: "Annoucement has been successfully deleted" })
        appDispatch({ type: "showSuccessAlert" })
        setIsDeleting(false)
        setSentRequest(false)
        // if delete request is successful, update the state to reflect the change
        props.setState(draft => {
          draft.annoucement = draft.annoucement.filter(annoucement => annoucement._id !== props.id)
        })
      }
    } catch (err) {
      appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
      appDispatch({ type: "showDangerAlert" })
      setIsDeleting(false)
      setSentRequest(false)
    }
  }

  function setNotification(e) {
    console.log(props.id)
    props.state.annoucement.filter(async annoucement => {
      if (annoucement._id == props.id) {
        setIsUpdating(true)
        // check if notification is already set
        if (annoucement.announceNotification) {
          try {
            // if Notification is already set, remove it
            const response = await Axios.post(`${appState.backendURL}/update-annoucement`, {
              id: props.id,
              head: props.head,
              body: props.body,
              pic: props.pic,
              announceNotification: false,
              token: localStorage.getItem("token"),
            })
            if (response.data) {
              appDispatch({ type: "setFlashMessage", message: "Annoucement removed successfully" })
              appDispatch({ type: "showSuccessAlert" })
              setIsUpdating(false)
              // if request is successful, update the UI to reflect the change
              props.setState(draft => {
                draft.annoucement.map(annoucement => {
                  if (annoucement._id == props.id) {
                    annoucement.announceNotification = false
                  }
                })
              })
            }
          } catch (err) {
            appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
            appDispatch({ type: "showDangerAlert" })
            setIsUpdating(false)
          }
        } else {
          try {
            // if Notification is not set, add it
            const response = await Axios.post(`${appState.backendURL}/update-annoucement`, {
              id: props.id,
              head: props.head,
              body: props.body,
              pic: props.pic,
              announceNotification: true,
              token: localStorage.getItem("token"),
            })
            if (response.data) {
              appDispatch({ type: "setFlashMessage", message: "Annoucement added successfully" })
              appDispatch({ type: "showSuccessAlert" })
              setIsUpdating(false)
              // if request is successful, update the UI to reflect the change
              props.setState(draft => {
                draft.annoucement.map(annoucement => {
                  if (annoucement._id == props.id) {
                    annoucement.announceNotification = true
                  }
                })
              })
            }
          } catch (err) {
            appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
            appDispatch({ type: "showDangerAlert" })
            setIsUpdating(false)
          }
        }
      }
    })
  }

  useEffect(() => {
    if (sentRequest) {
      sentDeleteRequest()
    }
  }, [sentRequest])
  return (
    <>
      {showDetail && <ViewSingleAnnoucement head={props.head} body={props.body} date={props.date} pic={props.pic} setShowDetail={setShowDetail} />}
      {showDialog && <DialogBox data={`Are you sure you want to delete this Accouncement?`} setShowDialog={setShowDialog} setSentRequest={setSentRequest} />}
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
            <div className="action-view" title="Announce this notification">
              {isUpdating ? <SmallLoading width={"20px"} height={"20px"} borderBottom={"2px solid transparent"} /> : <input type={"checkbox"} name="announceNotification" onChange={setNotification} checked={props.announceNotification} />}
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

export default Annoucement
