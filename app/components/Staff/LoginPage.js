import React, { useContext, useEffect, useRef } from "react"
import { Link, useNavigate, redirect, useParams } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import { CSSTransition } from "react-transition-group"
import SmallLoading from "../SmallLoading"
import Loading from "../Loading"

function LoginPage() {
  let navigate = useNavigate()
  const name = useParams()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const initialState = {
    email: { value: "", hasErrors: false, message: "" },
    password: { value: "", hasErrors: false, message: "" },
    hasSubmitErrors: false,
    isLoading: false,
    errorMessage: "",
    isError: false,
    loginRequestStatus: "pending",
  }

  // reducer Fuction
  function reducer(draft, action) {
    switch (action.type) {
      // this validation runs on the email field after every key strokes
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.message = ""
        draft.email.value = action.value
        if (draft.email.value.length > 50) {
          draft.email.message = "Cannot be more than 50 characters"
          draft.email.hasErrors = true
        }
        break

      // this validation runs on the email field after 800 milliseconds
      case "emailAfterDelay":
        if (draft.email.value != "") {
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(draft.email.value.trim())) {
            draft.email.message = "Please use a valid email"
            draft.email.hasErrors = true
          }
        } else {
          draft.email.message = "email cannot be empty"
          draft.email.hasErrors = true
        }
        break

      // this validation runs on the password field after every key stroke
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.message = ""
        draft.password.value = action.value
        if (draft.password.value != "") {
          if (draft.password.value.length < 8) {
            draft.password.message = "Cannot be less than 8 characters"
            draft.password.hasErrors = true
          }
        } else {
          draft.password.message = "Password cannot be empty"
          draft.password.hasErrors = true
        }
        break

      case "loading":
        draft.isLoading = true
        break

      case "finishLoading":
        draft.isLoading = false
        break

      case "error":
        draft.errorMessage = action.message
        draft.isError = true
        break
      case "loginRequestStatus":
        draft.loginRequestStatus = "completed"
        break

      case "handleSubmit":
        draft.hasSubmitErrors = true
        if (draft.email.hasErrors || draft.password.hasErrors) {
          draft.isLoading = false
          draft.hasSubmitErrors = true
        } else {
          draft.hasSubmitErrors = false
          if (!draft.hasSubmitErrors) {
            Axios.post(appState.backendURL + "/login", {
              email: draft.email.value,
              password: draft.password.value,
            })
              .then(response => {
                // the server sends either a user object or a false
                if (response.data.token) {
                  // if the login is successful
                  dispatch({ type: "finishLoading" })
                  appDispatch({ type: "login", token: response.data.token, userEmail: response.data.userEmail })
                } else {
                  dispatch({ type: "finishLoading" })
                  dispatch({ type: "error", message: "Invalid login credentials" })
                }
              })
              .catch(err => {
                // if there is any other network error
                if (err.response) {
                  dispatch({ type: "error", message: "Something went wrong, Try again" })
                  dispatch({ type: "finishLoading" })
                } else if (err.message) {
                  console.log(err.message)
                  dispatch({ type: "error", message: "Your request cannot be processed" })
                  dispatch({ type: "finishLoading" })
                } else {
                  dispatch({ type: "error", message: "Sorry, try again later..." })
                  dispatch({ type: "finishLoading" })
                }
              })
          } else {
            draft.isLoading = false
            alert("Something went wrong")
            console.log(state)
          }
        }
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const emailField = useRef(null)

  // watching for changes in the email field and calling after delay
  useEffect(() => {
    const delay = setTimeout(() => {
      if (state.email.value != "") {
        dispatch({ type: "emailAfterDelay" })
      }
    }, 800)
    return () => clearTimeout(delay)
  }, [state.email.value])

  // Run once when the page loads
  useEffect(() => {
    // emailField.current.focus()

    // check if the currenct user has token already saved in local storage
    // check the validity of the token
    if (localStorage.getItem("token")) {
      Axios.post(appState.backendURL + `/verify-token/${name.name}`, { token: localStorage.getItem("token") })
        .then(response => {
          if (!response.data) {
            // runs if the token is not valid and the server returns false
            // show the login page
            dispatch({ type: "loginRequestStatus" })
          } else {
            // runs if the token is valid and the server returns true
            appDispatch({ type: "login", token: localStorage.getItem("token"), userEmail: localStorage.getItem("userEmail") })
            dispatch({ type: "loginRequestStatus" })
          }
        })
        .catch(err => {
          console.log(err.message)
          // dispatch({ type: "loginRequestStatus" })
        })
    } else {
      // if the user does not have token saved in local storage
      dispatch({ type: "loginRequestStatus" })
    }
  }, [])

  function handleFocus(e) {
    e.target.style.border = "1px solid blue"
  }

  function handleBlur(e, field) {
    switch (field) {
      case "email":
        !state.email.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #badbcc") : state.email.hasErrors ? (e.target.style.border = "1px solid #f5c2c7") : (e.target.style.border = "")
        break
      case "password":
        !state.password.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #badbcc") : state.password.hasErrors ? (e.target.style.border = "1px solid #f5c2c7") : (e.target.style.border = "")
        break
    }
  }

  return (
    <>
      {state.loginRequestStatus == "pending" ? (
        <SmallLoading message="Loading data, please wait..." />
      ) : (
        <div className="signup-instructor-container">
          <div className="main-login-container">
            <div className="main-login-container-inner">
              {/* <div className="login-avartar">
              <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667678261/profile_ljoabg.jpg" alt="IMG" />
            </div> */}
              {state.isError ? (
                <div className="login-error-cont">
                  <p>{state.errorMessage}</p>
                </div>
              ) : (
                ""
              )}
              <div className="signup-instructor-sidebar2-header">
                <h2>Welcome Back!</h2>
                <p>Use your registered email and password to log into your accout.</p>
              </div>

              <div className="login-sidebar">
                <form
                  className="form-container"
                  onSubmit={async e => {
                    e.preventDefault()
                    dispatch({ type: "loading" })
                    dispatch({ type: "emailImmediately", value: state.email.value })
                    dispatch({ type: "passwordImmediately", value: state.password.value })
                    dispatch({ type: "handleSubmit" })
                  }}
                  action="/login"
                  method="POST"
                >
                  <label htmlFor="email">
                    <CSSTransition in={state.email.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                      <p style={appState.isDarkModeOn ? { color: "#ccc" } : {}} className="error-signup">
                        {state.email.message}
                        <i style={appState.isDarkModeOn ? { color: "yellow" } : {}} className="fa-solid fa-triangle-exclamation"></i>
                      </p>
                    </CSSTransition>
                    <input
                      ref={emailField}
                      style={{ border: state.email.hasErrors ? "1px solid #dc3545" : {} }}
                      onBlur={e => handleBlur(e, "email")}
                      onFocus={handleFocus}
                      onChange={e => {
                        handleBlur(e, "email")
                        dispatch({ type: "emailImmediately", value: e.target.value })
                      }}
                      className="main-input"
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="Email Address"
                    />
                  </label>

                  <label htmlFor="password">
                    <CSSTransition in={state.password.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                      <p style={appState.isDarkModeOn ? { color: "#ccc" } : {}} className="error-signup">
                        {state.password.message}
                        <i style={appState.isDarkModeOn ? { color: "yellow" } : {}} className="fa-solid fa-triangle-exclamation"></i>
                      </p>
                    </CSSTransition>
                    <input
                      style={{ border: state.password.hasErrors ? "1px solid #dc3545" : {} }}
                      onBlur={e => handleBlur(e, "password")}
                      onFocus={handleFocus}
                      onChange={e => {
                        handleBlur(e, "password")
                        dispatch({ type: "passwordImmediately", value: e.target.value })
                      }}
                      className="main-input"
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="Password"
                    />
                  </label>
                  {/* <button className="form-button button-style">
                  <div className="form-btn-text">{state.isLoading ? <SmallLoading /> : <p>LOG ME IN</p>}</div>
                </button> */}
                  <div className="admin-content-box-button">
                    <button className="action-button" style={{ background: "#4d54da", fontWeight: "bold", color: "#fff", border: "none", padding: state.isLoading ? "20px" : "" }}>
                      {state.isLoading ? (
                        <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBottom={"2px solid transparent"} />
                      ) : (
                        <>
                          <p>LOG ME IN</p>
                          <i className="fas fa-sign-in"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div className="login-footer">
                  <div className="forget-password">
                    <div>Did you forget your password?</div>
                    <Link to="#">Reset</Link>
                  </div>
                  <div className="forget-password">
                    <div>Don't have an Accout?</div>
                    <Link to="/instructor/signup">Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
