import React, { useContext, useEffect, useRef } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"

import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import SmallLoading from "../SmallLoading"

function EditDepartment(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const name = useRef(null)
  const [state, setState] = useImmer({
    name: { value: appState.department.name, hasErrors: false, message: "" },
    hod: { value: appState.department.hod, hasErrors: false, message: "" },
    mission: { value: appState.department.mission, hasErrors: false, message: "" },
    vision: { value: appState.department.vision, hasErrors: false, message: "" },
    description: { value: appState.department.description, hasErrors: false, message: "" },
    school: { value: appState.school.description, hasErrors: false, message: "" },
    staffData: [],
    schoolData: [],
    isSubmitting: false,
  })

  async function createDepartment(e) {
    e.preventDefault()
    if (!appState.department.name) {
      setState(draft => {
        draft.isSubmitting = true
      })
      // send create request
      try {
        const response = await Axios.post(`${appState.backendURL}/create-department`, {
          name: state.name.value,
          hod: state.hod.value,
          mission: state.mission.value,
          vision: state.vision.value,
          school: state.school.value,
          description: state.description.value,
          token: localStorage.getItem("token"),
        })
        if (response.data) {
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditDepartment" })
          appDispatch({ type: "setEditDepartment", department: {} })
          props.setDepartment(draft => {
            draft.departments = draft.departments.concat({ _id: response.data.insertedId, name: state.name.value, hod: state.hod.value, mission: state.mission.value, vision: state.vision.value, description: state.description.value })
          })
          appDispatch({ type: "setFlashMessage", message: "New Department has been created" })
          appDispatch({ type: "showSuccessAlert" })
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
        const response = await Axios.post(`${appState.backendURL}/update-department`, {
          id: appState.department.id,
          name: state.name.value,
          hod: state.hod.value,
          mission: state.mission.value,
          vision: state.vision.value,
          school: state.school.value,
          description: state.description.value,
          token: localStorage.getItem("token"),
        })
        if (response.data) {
          appDispatch({ type: "setFlashMessage", message: "Department information has been updated successfully" })
          appDispatch({ type: "showSuccessAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEditDepartment" })
          appDispatch({ type: "setEditDepartment", department: {} })
        }
        props.setDepartment(draft => {
          draft.departments.map(department => {
            if (department._id === appState.department.id) {
              department.name = state.name.value
              department.hod = state.hod.value
              department.mission = state.mission.value
              department.vision = state.vision.value
              department.description = state.description.value
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

  // fetching staff details
  useEffect(() => {
    Axios.post(`${appState.backendURL}/admin/dashboard/staff`, { token: localStorage.getItem("token") })
      .then(response => {
        setState(draft => {
          draft.staffData = response.data
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  // fetching school details
  useEffect(() => {
    Axios.post(`${appState.backendURL}/admin/dashboard/schools`, { token: localStorage.getItem("token") })
      .then(response => {
        setState(draft => {
          draft.schoolData = response.data
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
          <h4 className="heading-font">New Department Info</h4>
        </div>
        {state.staffData.length && state.schoolData.length ? (
          <div className="edit-body">
            <form onSubmit={createDepartment}>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="name">
                    Department Name
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
                    placeholder="Enter The Department Name"
                    required
                  />
                  <p className="text-font error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="school">
                    School
                  </label>
                  <select
                    value={state.school.value}
                    id="schoool"
                    name="school"
                    onChange={e =>
                      setState(draft => {
                        draft.school.value = e.target.value
                      })
                    }
                  >
                    <option>Select School</option>
                    {state.schoolData.map(school => (
                      <option value={school.name}>{school.name}</option>
                    ))}
                  </select>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="hod">
                    Head of the Department
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
                    Department Welcome Message
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
                    Department Mission Statement
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
                    placeholder="Write the mission of this department"
                  ></textarea>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="vision">
                    Department Vision Statement
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
                    appDispatch({ type: "closeEditDepartment" })
                    appDispatch({ type: "setEditDepartment", department: {} })
                  }}
                  className="action-button"
                  style={{ border: "1px solid rgb(220, 53, 69)", background: "transparent", color: "rgb(220, 53, 69)" }}
                >
                  Cancel
                </button>
                <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
                  {state.isSubmitting ? <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} /> : appState.department.name ? "Update" : "Create Department"}
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

export default EditDepartment
