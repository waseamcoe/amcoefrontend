import React, { useContext, useEffect, useRef, useState } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"

import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import SmallLoading from "../SmallLoading"

function EditStaff(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const firstname = useRef(null)
  const [state, setState] = useImmer({
    title: { value: appState.user.title, hasErrors: false, message: "" },
    pic: { value: appState.user.pic, hasErrors: false, message: "" },
    firstname: { value: appState.user.firstname, hasErrors: false, message: "" },
    lastname: { value: appState.user.lastname, hasErrors: false, message: "" },
    middlename: { value: appState.user.middlename, hasErrors: false, message: "" },
    email: { value: appState.user.email, hasErrors: false, message: "" },
    gender: { value: appState.user.gender, hasErrors: false, message: "" },
    role: { value: appState.user.role, hasErrors: false, message: "" },
    school: { value: appState.user.school, hasErrors: false, message: "" },
    department: { value: appState.user.department, hasErrors: false, message: "" },
    acadBio: { value: appState.user.acadBio, hasErrors: false, message: "" },
    schools: [],
    departments: [],
    isSubmitting: false,
  })

  async function createStaff(e) {
    e.preventDefault()
    setState(draft => {
      draft.isSubmitting = true
    })
    if (!appState.user.firstname) {
      // send create request
      try {
        const response = await Axios.post(`${appState.backendURL}/create-staff`, {
          title: state.title.value,
          pic: state.pic.value,
          firstname: state.firstname.value,
          lastname: state.lastname.value,
          middlename: state.middlename.value,
          email: state.email.value,
          gender: state.gender.value,
          role: state.role.value,
          school: state.school.value,
          department: state.department.value,
          acadBio: state.acadBio.value,
          token: localStorage.getItem("token"),
        })
        if (response.data) {
          appDispatch({ type: "setFlashMessage", message: "New staff has been created successfully" })
          appDispatch({ type: "showSuccessAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEdit" })
          appDispatch({ type: "setEditUser", user: {} })
          props.setStaff(draft => {
            draft.staff = draft.staff.concat({ _id: response.data.insertedId, firstname: state.firstname.value, lastname: state.lastname.value, middlename: state.middlename.value, title: state.title.value, email: state.email.value, gender: state.gender.value, role: state.role.value, school: state.school.value, department: state.department.value, acadBio: state.acadBio.value })
          })
        }
      } catch (err) {
        appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
        appDispatch({ type: "showDangerAlert" })
      }
    } else {
      setState(draft => {
        draft.isSubmitting = true
      })
      // send edit request
      try {
        const response = await Axios.post(`${appState.backendURL}/update-staff`, {
          id: appState.user.id,
          pic: appState.user.pic,
          title: state.title.value,
          firstname: state.firstname.value,
          lastname: state.lastname.value,
          middlename: state.middlename.value,
          email: state.email.value,
          gender: state.gender.value,
          role: state.role.value,
          school: state.school.value,
          department: state.department.value,
          acadBio: state.acadBio.value,
          token: localStorage.getItem("token"),
        })
        if (response.data) {
          appDispatch({ type: "setFlashMessage", message: "Staff profile has been updated successfully" })
          appDispatch({ type: "showSuccessAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
          appDispatch({ type: "closeEdit" })
          appDispatch({ type: "setEditUser", user: {} })
        }
        props.setStaff(draft => {
          draft.staff.map(staff => {
            if (staff._id === appState.user.id) {
              staff.title = state.title.value
              staff.firstname = state.firstname.value
              staff.lastname = state.lastname.value
              staff.middlename = state.middlename.value
              staff.pic = state.pic.value
              staff.acadBio = state.acadBio.value
              staff.email = state.email.value
              staff.gender = state.gender.value
              staff.role = state.role.value
              staff.school = state.school.value
              staff.department = state.department.value
            }
          })
        })
      } catch (err) {
        appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
        appDispatch({ type: "showDangerAlert" })
      }
    }
  }

  function getSchools() {
    Axios.post(`${appState.backendURL}/admin/dashboard/schools`, { token: localStorage.getItem("token") })
      .then(response => {
        setState(draft => {
          draft.schools = response.data
        })
      })
      .catch(err => {
        appDispatch({ type: "setFlashMessage", message: "There is a problem fetching schoools" })
        appDispatch({ type: "showDangerAlert" })
      })
  }

  function getDepartments() {
    Axios.post(`${appState.backendURL}/admin/dashboard/departments`, { token: localStorage.getItem("token") })
      .then(response => {
        setState(draft => {
          draft.departments = response.data
        })
      })
      .catch(err => {
        appDispatch({ type: "setFlashMessage", message: "There is a problem fetching departments" })
        appDispatch({ type: "showDangerAlert" })
      })
  }

  useEffect(() => {
    getSchools()
    getDepartments()
  }, [])

  return (
    <div className="staff-edit-cont">
      <div className="staff-edit-inner">
        <div className="staff-edit-head">
          <h4 className="heading-font">New Staff Info</h4>
        </div>
        {state.schools.length && state.departments.length ? (
          <div className="edit-body">
            <form onSubmit={createStaff}>
              <div className="edit-row1 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="title">
                    Title
                  </label>
                  <select
                    value={state.title.value}
                    id="title"
                    name="title"
                    onChange={e =>
                      setState(draft => {
                        draft.title.value = e.target.value
                      })
                    }
                  >
                    <option>Title</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Mal</option>
                    <option>Dr</option>
                    <option>Prof</option>
                    <option>Madam</option>
                  </select>
                  <p className="error-msg-text"></p>
                </div>
                <div className="input-field">
                  <label className="text-font" htmlFor="firstname">
                    First Name
                  </label>
                  <input
                    ref={firstname}
                    value={state.firstname.value}
                    id="firstname"
                    name="firstname"
                    onChange={e => {
                      setState(draft => {
                        draft.firstname.value = e.target.value
                      })
                    }}
                    placeholder="Enter First Name"
                    required
                  />
                  <p className="text-font error-msg-text"></p>
                </div>
                <div className="input-field">
                  <label className="text-font" htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    value={state.lastname.value}
                    id="lastname"
                    name="lastname"
                    onChange={e =>
                      setState(draft => {
                        draft.lastname.value = e.target.value
                      })
                    }
                    placeholder="Enter Last Name"
                    required
                  />
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row12 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="middlename">
                    Middle Name
                  </label>
                  <input
                    value={state.middlename.value}
                    id="middlename"
                    name="middlename"
                    onChange={e =>
                      setState(draft => {
                        draft.middlename.value = e.target.value
                      })
                    }
                    placeholder="Enter Middle Name"
                  />
                  <p className="error-msg-text"></p>
                </div>
                <div className="input-field">
                  <label className="text-font" htmlFor="pic">
                    Picture URL
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
                  />
                  <p className="text-font error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row2 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="email">
                    Email
                  </label>
                  <input
                    value={state.email.value}
                    type={"email"}
                    name="email"
                    id="email"
                    onChange={e =>
                      setState(draft => {
                        draft.email.value = e.target.value
                      })
                    }
                    placeholder="Enter Email"
                    required
                  />
                  <p className="error-msg-text"></p>
                </div>
                <div className="input-field">
                  <label className="text-font" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    value={state.gender.value}
                    id="gender"
                    name="gender"
                    onChange={e =>
                      setState(draft => {
                        draft.gender.value = e.target.value
                      })
                    }
                  >
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row3 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="role">
                    Role
                  </label>
                  <select
                    value={state.role.value}
                    id="role"
                    name="role"
                    onChange={e =>
                      setState(draft => {
                        draft.role.value = e.target.value
                      })
                    }
                  >
                    <option>Provost</option>
                    <option>Deputy Provost Academic</option>
                    <option>Deputy Provost Administration</option>
                    <option>Registrar</option>
                    <option>Chief Librarian</option>
                    <option>Bursa</option>
                    <option>Dean of School</option>
                    <option>Director</option>
                    <option>Head of Department (HOD)</option>
                    <option>Staff</option>
                    <option>Academic Secretary</option>
                  </select>
                  <p className="error-msg-text"></p>
                </div>
                <div className="input-field">
                  <label className="text-font" htmlFor="school">
                    School
                  </label>
                  <select
                    value={state.school.value}
                    id="school"
                    name="school"
                    onChange={e =>
                      setState(draft => {
                        draft.school.value = e.target.value
                      })
                    }
                  >
                    <option>Select School</option>
                    {state.schools.map(school => (
                      <option value={school.name}>{school.name}</option>
                    ))}
                  </select>
                  <p className="error-msg-text"></p>
                </div>
                <div className="input-field">
                  <label className="text-font" htmlFor="department">
                    Department
                  </label>
                  <select
                    value={state.department.value}
                    id="department"
                    onChange={e =>
                      setState(draft => {
                        draft.department.value = e.target.value
                      })
                    }
                  >
                    <option>Select Department</option>
                    {state.departments.map(department => (
                      <option value={department.name}>{department.name}</option>
                    ))}
                  </select>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-row4 edit-row">
                <div className="input-field">
                  <label className="text-font" htmlFor="acadBio">
                    Academic Bio-data
                  </label>
                  <textarea
                    value={state.acadBio.value}
                    className="text-font"
                    name="acadBio"
                    id="acadBio"
                    onChange={e =>
                      setState(draft => {
                        draft.acadBio.value = e.target.value
                      })
                    }
                    placeholder="Enter your Academic bio data"
                    required
                  ></textarea>
                  <p className="error-msg-text"></p>
                </div>
              </div>
              <div className="edit-submit">
                <button
                  onClick={() => {
                    appDispatch({ type: "closeEdit" })
                    appDispatch({ type: "setEditUser", user: {} })
                  }}
                  className="action-button"
                  style={{ border: "1px solid rgb(220, 53, 69)", background: "transparent", color: "rgb(220, 53, 69)" }}
                >
                  Cancel
                </button>
                <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
                  {state.isSubmitting ? <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} /> : appState.user.firstname ? "Update" : "Create Staff"}
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

export default EditStaff
