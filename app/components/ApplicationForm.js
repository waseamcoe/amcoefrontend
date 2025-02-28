import React, { useContext, useRef } from "react"
import { useImmer } from "use-immer"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function ApplicationForm() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const surname = useRef(null)
  const [state, setState] = useImmer({
    title: { value: appState.user.title, hasErrors: false, message: "" },
    placeOfBirth: { value: appState.user.placeOfBirth, hasErrors: false, message: "" },
    firstname: { value: appState.user.firstname, hasErrors: false, message: "" },
    surname: { value: appState.user.surname, hasErrors: false, message: "" },
    othername: { value: appState.user.othername, hasErrors: false, message: "" },
    email: { value: appState.user.email, hasErrors: false, message: "" },
    gender: { value: appState.user.gender, hasErrors: false, message: "" },
    phone: { value: appState.user.phone, hasErrors: false, message: "" },
    hobby: { value: appState.user.hobby, hasErrors: false, message: "" },
    religion: { value: appState.user.religion, hasErrors: false, message: "" },
    stateOfOrigin: { value: appState.user.stateOfOrigin, hasErrors: false, message: "" },
    lga: { value: appState.user.lga, hasErrors: false, message: "" },
    maritalStatus: { value: appState.user.maritalStatus, hasErrors: false, message: "" },
    dob: { value: appState.user.dob, hasErrors: false, message: "" },
    schools: [],
    departments: [],
    isSubmitting: false,
  })
  return (
    <div className="application-container">
      <div className="staff-edit-cont">
        <div className="staff-edit-inner">
          <div className="staff-edit-head">
            <div className="application-main-heading">
              <h4 className="heading-font">APPLICATION FORM</h4>
              <p className="text-font">I hereby declare that all the information I supplied in this bio-data is, to the best of my knowledge and belief, accurate in every detail misrepresentation may result in the denial or cancellation of admission.</p>
            </div>
            <div className="staff-edit-head-flex">
              <div className="personal-info" style={{ border: "1px solid #f1f1f1", borderBottom: "none", background: "#f1f1f1" }}>
                <div className="apply-sec-head">
                  <h4 className="heading-font">Bio-data</h4>
                </div>
              </div>
              <div className="address-info">
                <div className="apply-sec-head">
                  <h4 className="heading-font">Address</h4>
                </div>
              </div>
              <div className="address-info">
                <div className="apply-sec-head">
                  <h4 className="heading-font">Next of Kin</h4>
                </div>
              </div>
              <div className="address-info">
                <div className="apply-sec-head">
                  <h4 className="heading-font">Passport</h4>
                </div>
              </div>
              <div className="address-info">
                <div className="apply-sec-head">
                  <h4 className="heading-font">Sponsors</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="apply-page-description">
            <h3 className="heading-font">Student Profile</h3>
          </div>
          <div className="edit-body">
            <form>
              <div className="application-page1">
                <div className="edit-row1 edit-row">
                  <div className="input-field">
                    <label className="text-font" htmlFor="title">
                      Title
                    </label>
                    <select
                      value={""}
                      id="title"
                      name="title"
                      onChange={e =>
                        setState(draft => {
                          // to do somethings here soon...
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
                    <label className="text-font" htmlFor="surname">
                      Surname
                    </label>
                    <input
                      ref={surname}
                      value={state.surname.value}
                      id="surname"
                      name="surname"
                      onChange={e => {
                        setState(draft => {
                          draft.surname.value = e.target.value
                        })
                      }}
                      placeholder="Enter your surname"
                      required
                    />
                    <p className="text-font error-msg-text"></p>
                  </div>
                  <div className="input-field">
                    <label className="text-font" htmlFor="firstname">
                      First Name
                    </label>
                    <input
                      value={state.firstname.value}
                      id="firstname"
                      name="firstname"
                      onChange={e =>
                        setState(draft => {
                          draft.firstname.value = e.target.value
                        })
                      }
                      placeholder="Enter your First Name"
                      required
                    />
                    <p className="error-msg-text"></p>
                  </div>
                </div>
                <div className="edit-row12 edit-row">
                  <div className="input-field">
                    <label className="text-font" htmlFor="othername">
                      Other Name
                    </label>
                    <input
                      value={state.othername.value}
                      id="othername"
                      name="othername"
                      onChange={e =>
                        setState(draft => {
                          draft.othername.value = e.target.value
                        })
                      }
                      placeholder="Enter your other Name"
                    />
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
                    <label className="text-font" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      value={state.phone.value}
                      type={"number"}
                      name="phone"
                      id="phone"
                      onChange={e =>
                        setState(draft => {
                          draft.phone.value = e.target.value
                        })
                      }
                      placeholder="09012345678"
                      required
                    />
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
                  {/* <button
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
              </button> */}
                </div>
              </div>
              <div className="application-page2">
                <div className="edit-row1 edit-row">
                  <div className="input-field">
                    <label className="text-font" htmlFor="title">
                      Title
                    </label>
                    <select
                      value={""}
                      id="title"
                      name="title"
                      onChange={e =>
                        setState(draft => {
                          // to do somethings here soon...
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
                    <label className="text-font" htmlFor="surname">
                      Surname
                    </label>
                    <input
                      ref={surname}
                      value={state.surname.value}
                      id="surname"
                      name="surname"
                      onChange={e => {
                        setState(draft => {
                          draft.surname.value = e.target.value
                        })
                      }}
                      placeholder="Enter your surname"
                      required
                    />
                    <p className="text-font error-msg-text"></p>
                  </div>
                  <div className="input-field">
                    <label className="text-font" htmlFor="firstname">
                      First Name
                    </label>
                    <input
                      value={state.firstname.value}
                      id="firstname"
                      name="firstname"
                      onChange={e =>
                        setState(draft => {
                          draft.firstname.value = e.target.value
                        })
                      }
                      placeholder="Enter your First Name"
                      required
                    />
                    <p className="error-msg-text"></p>
                  </div>
                </div>
                <div className="edit-row12 edit-row">
                  <div className="input-field">
                    <label className="text-font" htmlFor="othername">
                      Other Name
                    </label>
                    <input
                      value={state.othername.value}
                      id="othername"
                      name="othername"
                      onChange={e =>
                        setState(draft => {
                          draft.othername.value = e.target.value
                        })
                      }
                      placeholder="Enter your other Name"
                    />
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
                    <label className="text-font" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      value={state.phone.value}
                      type={"number"}
                      name="phone"
                      id="phone"
                      onChange={e =>
                        setState(draft => {
                          draft.phone.value = e.target.value
                        })
                      }
                      placeholder="09012345678"
                      required
                    />
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
                  {/* <button
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
              </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm
