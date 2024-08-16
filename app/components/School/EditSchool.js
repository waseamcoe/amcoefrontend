import React, { useContext, useEffect, useRef } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"

import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import SmallLoading from "../SmallLoading"

function EditSchool(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const name = useRef(null)
  const [state, setState] = useImmer({
    name: { value: appState.school.name, hasErrors: false, message: "" },
    hod: { value: appState.school.hod, hasErrors: false, message: "" },
    mission: { value: appState.school.mission, hasErrors: false, message: "" },
    vision: { value: appState.school.vision, hasErrors: false, message: "" },
    description: { value: appState.school.description, hasErrors: false, message: "" },
    staffData: [],
    isSubmitting: false,
  })

  async function createSchool(e) {
    e.preventDefault()
    if (!appState.school.name) {
      setState(draft => {
        draft.isSubmitting = true
      })
      // send create request
      try {
        const response = await Axios.post(`${appState.backendURL}/create-school`, {
          name: state.name.value,
          hod: state.hod.value,
          mission: state.mission.value,
          vision: state.vision.value,
          description: state.description.value,
        })
        if (response.data) {
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditSchool" })
          appDispatch({ type: "setEditSchool", school: {} })
          props.setSchool(draft => {
            draft.schools = draft.schools.concat({ _id: response.data.insertedId, name: state.name.value, hod: state.hod.value, mission: state.mission.value, vision: state.vision.value, description: state.description.value })
          })
        }
      } catch (err) {
        console.log(err.message)
      }
    } else {
      // send edit request
      try {
        setState(draft => {
          draft.isSubmitting = true
        })
        const response = await Axios.post(`${appState.backendURL}/update-school`, {
          id: appState.school.id,
          name: state.name.value,
          hod: state.hod.value,
          mission: state.mission.value,
          vision: state.vision.value,
          description: state.description.value,
        })
        if (response.data) {
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditSchool" })
          appDispatch({ type: "setEditSchool", school: {} })
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  // component effects
  useEffect(() => {
    Axios.get(`${appState.backendURL}/admin/dashboard/staff`)
      .then(response => {
        setState(draft => {
          draft.staffData = response.data
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <div className="staff-edit-cont">
      <div className="staff-edit-inner">
        <div className="staff-edit-head">
          <h4 className="heading-font">New School Info</h4>
        </div>
        {state.staffData.length ? (
          <div className="edit-body">
            <form onSubmit={createSchool}>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="name">
                    School Name
                  </label>
                  <input
                    ref={name}
                    value={state.name.value}
                    id="name"
                    name="name"
                    onChange={e => {
                      setState(draft => {
                        draft.name.value = e.target.value
                      })
                    }}
                    placeholder="Enter The School Name"
                    required
                  />
                  <p className="text-font error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="hod">
                    Dean of School
                  </label>
                  <select
                    value={state.hod.value}
                    id="hod"
                    name="hod"
                    onChange={e =>
                      setState(draft => {
                        draft.hod.value = e.target.value
                      })
                    }
                  >
                    <option>Select Staff</option>
                    {state.staffData.map(staff => (
                      <option value={staff._id}>
                        {staff.firstname} {staff.lastname} {staff.middlename}
                      </option>
                    ))}
                  </select>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="description">
                    Welcome Message
                  </label>
                  <textarea
                    value={state.description.value}
                    className="text-font"
                    name="description"
                    id="description"
                    onChange={e =>
                      setState(draft => {
                        draft.description.value = e.target.value
                      })
                    }
                    placeholder="Enter a message that should appear when people view the department"
                    required
                  ></textarea>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="mission">
                    School Mission Statement
                  </label>
                  <textarea
                    value={state.mission.value}
                    className="text-font"
                    name="mission"
                    id="mission"
                    onChange={e =>
                      setState(draft => {
                        draft.mission.value = e.target.value
                      })
                    }
                    placeholder="Write the mission of this school"
                  ></textarea>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="vision">
                    School Vision Statement
                  </label>
                  <textarea
                    value={state.vision.value}
                    className="text-font"
                    name="vision"
                    id="vision"
                    onChange={e =>
                      setState(draft => {
                        draft.vision.value = e.target.value
                      })
                    }
                    placeholder="Enter a message that should appear when people view the department"
                    required
                  ></textarea>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-submit">
                <button
                  onClick={() => {
                    appDispatch({ type: "closeEditSchool" })
                    appDispatch({ type: "setEditSchool", school: {} })
                  }}
                  className="action-button"
                  style={{ border: "1px solid rgb(220, 53, 69)", background: "transparent", color: "rgb(220, 53, 69)" }}
                >
                  Cancel
                </button>
                <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
                  {state.isSubmitting ? <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <SmallLoading />
        )}
      </div>
    </div>
  )
}

export default EditSchool
