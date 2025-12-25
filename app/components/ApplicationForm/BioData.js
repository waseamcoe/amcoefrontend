import React, { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import Axios from "axios"
import { useParams } from "react-router-dom"
import SmallLoading from "../SmallLoading"

export default function BioData() {
  const params = useParams()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer({
    title: { value: appState.user.title, hasErrors: false, message: "" },
    placeOfBirth: { value: appState.user.placeOfBirth, hasErrors: false, message: "" },
    firstName: { value: appState.user.firstName, hasErrors: false, message: "" },
    lastName: { value: appState.user.lastName, hasErrors: false, message: "" },
    middleName: { value: appState.user.middleName, hasErrors: false, message: "" },
    email: { value: appState.user.email, hasErrors: false, message: "" },
    gender: { value: appState.user.gender, hasErrors: false, message: "" },
    phone: { value: appState.user.phone, hasErrors: false, message: "" },
    hobby: { value: appState.user.hobby, hasErrors: false, message: "" },
    religion: { value: appState.user.religion, hasErrors: false, message: "" },
    stateOfOrigin: { value: appState.user.stateOfOrigin, hasErrors: false, message: "" },
    lga: { value: appState.user.lga, hasErrors: false, message: "" },
    maritalStatus: { value: appState.user.maritalStatus, hasErrors: false, message: "" },
    dob: { value: appState.user.dob, hasErrors: false, message: "" },
    saved: false,
    isSubmitting: false,
  })

  useEffect(() => {
    Axios.post(`${appState.backendURL}/find-student`, { id: params.id })
      .then(student => {
        setState(draft => {
          draft.firstName.value = student.data.firstName
          draft.lastName.value = student.data.lastName
          draft.middleName.value = student.data.middleName
          draft.email.value = student.data.email
          draft.phone.value = student.data.phone
          draft.placeOfBirth.value = student.data.placeOfBirth
          draft.gender.value = student.data.gender
        })
      })
      .catch(err => {
        appDispatch({ type: "setFlashMessage", message: "Student's record not fetched, kindly check your network" })
        appDispatch({ type: "showDangerAlert" })
      })
  }, [])

  function saveBioData(e) {
    e.preventDefault()
    console.log(state)
    setState(draft => {
      draft.isSubmitting = true
    })
    Axios.post(`${appState.backendURL}/save-biodata`, {
      id: params.id,
      title: state.title.value,
      placeOfBirth: state.placeOfBirth.value,
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      middleName: state.middleName.value,
      email: state.email.value,
      gender: state.gender.value,
      phone: state.phone.value,
      hobby: state.hobby.value,
      religion: state.religion.value,
      stateOfOrigin: state.stateOfOrigin.value,
      lga: state.lga.value,
      maritalStatus: state.maritalStatus.value,
      dob: state.dob.value,
      admissionStatus: "pending",
    })
      .then(data => {
        appDispatch({ type: "setFlashMessage", message: "Bio-data saved successfully" })
        appDispatch({ type: "showSuccessAlert" })
        setState(draft => {
          draft.isSubmitting = false
        })
        //  send the user to the next page
      })
      .catch(err => {
        appDispatch({ type: "setFlashMessage", message: "Sorry there is a problem, try again later" })
        appDispatch({ type: "showDangerAlert" })
        setState(draft => {
          draft.isSubmitting = false
        })
      })
  }
  return (
    <form onSubmit={saveBioData}>
      <div className="application-page1">
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
            <label className="text-font" htmlFor="lastName">
              Last Name
            </label>
            <input value={state.lastName.value} id="lastName" name="lastName" placeholder="Enter your surname" required />
            <p className="text-font error-msg-text"></p>
          </div>
          <div className="input-field">
            <label className="text-font" htmlFor="firstName">
              First Name
            </label>
            <input value={state.firstName.value} id="firstName" name="firstName" placeholder="Enter your First Name" required />
            <p className="error-msg-text"></p>
          </div>
        </div>
        <div className="edit-row12 edit-row">
          <div className="input-field">
            <label className="text-font" htmlFor="middleName">
              Other Name
            </label>
            <input value={state.middleName.value} id="middleName" name="middleName" placeholder="Enter your other Name" />
            <p className="error-msg-text"></p>
          </div>
          <div className="input-field">
            <label className="text-font" htmlFor="placeOfBirth">
              Place of Birth
            </label>
            <input
              value={state.placeOfBirth.value}
              id="placeOfBirth"
              name="placeOfBirth"
              onChange={e => {
                setState(draft => {
                  draft.placeOfBirth.value = e.target.value
                })
              }}
              placeholder="Town in which you were born"
            />
            <p className="text-font error-msg-text"></p>
          </div>
        </div>
        <div className="edit-row2 edit-row">
          <div className="input-field">
            <label className="text-font" htmlFor="email">
              Email
            </label>
            <input value={state.email.value} type={"email"} name="email" id="email" placeholder="Enter Email" required />
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
            <label className="text-font" htmlFor="phone">
              Phone Number
            </label>
            <input value={state.phone.value} type={"number"} name="phone" id="phone" placeholder="09012345678" required />
            <p className="error-msg-text"></p>
          </div>
          <div className="input-field">
            <label className="text-font" htmlFor="Hobby">
              Hobby
            </label>
            <input
              value={state.hobby.value}
              type={"Hobby"}
              name="Hobby"
              id="Hobby"
              onChange={e =>
                setState(draft => {
                  draft.hobby.value = e.target.value
                })
              }
              placeholder="e.g Football"
            />
            <p className="error-msg-text"></p>
          </div>
          <div className="input-field">
            <label className="text-font" htmlFor="religion">
              Religion
            </label>
            <select
              value={state.religion.value}
              id="religion"
              onChange={e =>
                setState(draft => {
                  draft.religion.value = e.target.value
                })
              }
            >
              <option>Select Religion</option>
              <option>Islam</option>
              <option>Cristianity</option>
              <option>Others</option>
            </select>
            <p className="error-msg-text"></p>
          </div>
        </div>
        <div className="edit-row12 edit-row">
          <div className="input-field">
            <label className="text-font" htmlFor="stateOfOrigin">
              State of Origin
            </label>
            <select
              value={state.stateOfOrigin.value}
              id="stateOfOrigin"
              onChange={e =>
                setState(draft => {
                  draft.stateOfOrigin.value = e.target.value
                })
              }
            >
              <option>Select State</option>
              <option>Abia</option>
              <option>Plateau</option>
              <option>Kano</option>
            </select>
            <p className="error-msg-text"></p>
          </div>
          <div className="input-field">
            <label className="text-font" htmlFor="lga">
              Local Government
            </label>
            <select
              value={state.lga.value}
              id="lga"
              onChange={e =>
                setState(draft => {
                  draft.lga.value = e.target.value
                })
              }
            >
              <option>Select LGA</option>
              <option>Bukur</option>
              <option>Mangu</option>
              <option>Darazau</option>
            </select>
            <p className="error-msg-text"></p>
          </div>
        </div>
        <div className="edit-row12 edit-row">
          <div className="input-field">
            <label className="text-font" htmlFor="maritalStatus">
              Marital Status
            </label>
            <select
              value={state.maritalStatus.value}
              id="maritalStatus"
              onChange={e =>
                setState(draft => {
                  draft.maritalStatus.value = e.target.value
                })
              }
            >
              <option>Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Others</option>
            </select>
            <p className="error-msg-text"></p>
          </div>
          <div className="input-field">
            <label className="text-font" htmlFor="dob">
              Date of Birth
            </label>
            <input
              value={state.dob.value}
              type={"date"}
              name="dob"
              id="dob"
              onChange={e =>
                setState(draft => {
                  draft.dob.value = e.target.value
                })
              }
              placeholder=""
              required
            />
            <p className="error-msg-text"></p>
          </div>
        </div>
        <div className="edit-submit">
          <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
            {state.isSubmitting ? (
              <>
                <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} transform={"none"} marginRight={"5px"} position={"0"} />
                Saving...
              </>
            ) : (
              "Save and Proceed"
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
