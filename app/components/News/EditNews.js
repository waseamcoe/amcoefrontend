import React, { useContext, useEffect, useRef } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"

import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"

import SmallLoading from "../SmallLoading"

function EditNews(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const name = useRef(null)
  const [state, setState] = useImmer({
    head: { value: appState.news.head, hasErrors: false, message: "" },
    body: { value: appState.news.body, hasErrors: false, message: "" },
    pic: { value: appState.news.pic, hasErrors: false, message: "" },
    isSubmitting: false,
  })

  async function createNews(e) {
    e.preventDefault()
    if (!appState.news.head) {
      setState(draft => {
        draft.isSubmitting = true
      })
      // send create request
      try {
        const response = await Axios.post(`${appState.backendURL}/create-news`, {
          head: state.head.value,
          body: state.body.value,
          pic: state.pic.value,
          date: new Date(),
        })
        if (response.data) {
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditNews" })
          appDispatch({ type: "setEditNews", news: {} })
          props.setNews(draft => {
            draft.news = draft.news.concat({ _id: response.data.insertedId, head: state.head.value, body: state.body.value, pic: state.pic.value, date: new Date() })
          })
          appDispatch({ type: "setFlashMessage", message: "News has been created successfully" })
          appDispatch({ type: "showSuccessAlert" })
        }
      } catch (err) {
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
        const response = await Axios.post(`${appState.backendURL}/update-news`, {
          id: appState.news.id,
          head: state.head.value,
          body: state.body.value,
          pic: state.pic.value,
        })
        if (response.data) {
          appDispatch({ type: "setFlashMessage", message: "News information has been updated successfully" })
          appDispatch({ type: "showSuccessAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditNews" })
          appDispatch({ type: "setEditNews", news: {} })
        }
        props.setNews(draft => {
          draft.news.map(news => {
            if (news._id === appState.news.id) {
              news.head = state.head.value
              news.body = state.body.value
              news.pic = state.pic.value
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
          <h4 className="heading-font">News Update</h4>
        </div>
        <div className="edit-body">
          <form onSubmit={createNews}>
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
                  placeholder="Enter the news heading"
                  required
                />
                <p className="text-font error-msg-text"></p>
              </div>
            </div>
            <div className="edit-row4 edit-row">
              <div className="input-field">
                <label className="text-font" htmlFor="body">
                  News Content
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
                  placeholder="Enter the news content here"
                  required
                ></textarea>
                <p className="error-msg-text"></p>
              </div>
            </div>
            <div className="input-field">
              <label className="text-font" htmlFor="pic">
                News Picture URL
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
                  appDispatch({ type: "closeEditNews" })
                  appDispatch({ type: "setEditNews", news: {} })
                }}
                className="action-button"
                style={{ border: "1px solid rgb(220, 53, 69)", background: "transparent", color: "rgb(220, 53, 69)" }}
              >
                Cancel
              </button>
              <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
                {state.isSubmitting ? <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} /> : appState.news.head ? "Update" : "Create News"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditNews
