import React, { useContext, useEffect, useRef } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"

import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"

import SmallLoading from "../SmallLoading"

function EditAnnoucement(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const name = useRef(null)
  const [state, setState] = useImmer({
    head: { value: appState.annoucement.head, hasErrors: false, message: "" },
    body: { value: appState.annoucement.body, hasErrors: false, message: "" },
    pic: { value: appState.annoucement.pic, hasErrors: false, message: "" },
    announceNotification: { value: appState.annoucement.announceNotification, hasErrors: false, message: "" },
    isSubmitting: false,
  })

  async function createAnnoucement(e) {
    e.preventDefault()
    if (!appState.annoucement.head) {
      setState(draft => {
        draft.isSubmitting = true
      })
      // send create request
      try {
        console.log(appState.announceNotification)
        const response = await Axios.post(`${appState.backendURL}/create-annoucement`, {
          head: state.head.value,
          body: state.body.value,
          pic: state.pic.value,
          date: new Date(),
          announceNotification: state.announceNotification.value,
          token: localStorage.getItem("token"),
        })
        if (response.data) {
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditAnnoucement" })
          appDispatch({ type: "setEditAnnoucement", annoucement: {} })
          props.setAnnoucement(draft => {
            draft.annoucement = draft.annoucement.concat({ _id: response.data.insertedId, head: state.head.value, body: state.body.value, pic: state.pic.value, date: new Date() })
          })
          appDispatch({ type: "setFlashMessage", message: "An annoucement has been created successfully" })
          appDispatch({ type: "showSuccessAlert" })
        }
      } catch (err) {
        console.log(err)
        appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
        appDispatch({ type: "showDangerAlert" })
        setState(draft => {
          draft.isSubmitting = false
        })
      }
    } else {
      setState(draft => {
        draft.isSubmitting = true
      })
      // send edit request
      try {
        console.log(appState.annoucement)
        const response = await Axios.post(`${appState.backendURL}/update-annoucement`, {
          id: appState.annoucement.id,
          head: state.head.value,
          body: state.body.value,
          pic: state.pic.value,
          announceNotification: state.announceNotification.value,
          token: localStorage.getItem("token"),
        })
        if (response.data) {
          appDispatch({ type: "setFlashMessage", message: "Annoucement information has been updated successfully" })
          appDispatch({ type: "showSuccessAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditAnnoucement" })
          appDispatch({ type: "setEditAnnoucement", annoucement: {} })
        }
        props.setAnnoucement(draft => {
          draft.annoucement.map(annoucement => {
            if (annoucement._id === appState.annoucement.id) {
              EditAnnoucement.head = state.head.value
              annoucement.body = state.body.value
              annoucement.pic = state.pic.value
              annoucement.announceNotification = state.announceNotification.value
            }
          })
        })
      } catch (err) {
        appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
        appDispatch({ type: "showDangerAlert" })
        setState(draft => {
          draft.isSubmitting = false
        })
      }
    }
  }

  // component effects
  useEffect(() => {
    name.current.focus()
  }, [])
  return (
    <div className="staff-edit-cont">
      <div className="staff-edit-inner">
        <div className="staff-edit-head">
          <h4 className="heading-font">Annoucement Update</h4>
        </div>
        <div className="edit-body">
          <form onSubmit={createAnnoucement}>
            <div className="edit-row4 edit-row"></div>
            <div className="edit-row4 edit-row">
              <div className="input-field">
                <label className="text-font" htmlFor="head">
                  News Heading
                </label>
                <input
                  ref={name}
                  value={state.head.value}
                  id="head"
                  name="head"
                  onChange={e => {
                    setState(draft => {
                      draft.head.value = e.target.value
                    })
                  }}
                  placeholder="Enter the annoucement heading"
                  required
                />
                <p className="text-font error-msg-text"></p>
              </div>
            </div>
            <div className="edit-row4 edit-row">
              <div className="input-field">
                <label className="text-font" htmlFor="body">
                  Annoucement Content
                </label>
                <textarea
                  value={state.body.value}
                  className="text-font"
                  name="body"
                  id="body"
                  onChange={e =>
                    setState(draft => {
                      draft.body.value = e.target.value
                    })
                  }
                  placeholder="Enter an annoucement content here"
                  required
                ></textarea>
                <p className="error-msg-text"></p>
              </div>
            </div>
            <div className="input-field">
              <label className="text-font" htmlFor="pic">
                Annoucement Picture URL
              </label>
              <input
                value={state.pic.value}
                id="pic"
                name="pic"
                onChange={e => {
                  setState(draft => {
                    draft.pic.value = e.target.value
                  })
                }}
                placeholder="e.g https://myimageurl.com"
                required
              />
              <p className="text-font error-msg-text"></p>
            </div>
            <div className="edit-submit">
              <button
                onClick={() => {
                  appDispatch({ type: "closeEditAnnoucement" })
                  appDispatch({ type: "setEditAnnoucement", annoucement: {} })
                }}
                className="action-button"
                style={{ border: "1px solid rgb(220, 53, 69)", background: "transparent", color: "rgb(220, 53, 69)" }}
              >
                Cancel
              </button>
              <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
                {state.isSubmitting ? <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} /> : appState.news.head ? "Update" : "Create Annoucement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditAnnoucement
