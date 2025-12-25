import React, { useContext, useEffect, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion" // Fixed import string
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import SmallLoading from "../SmallLoading"

function LoginPage() {
  const { name } = useParams() // Destructured for cleaner access
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const initialState = {
    email: { value: "", hasErrors: false, message: "" },
    password: { value: "", hasErrors: false, message: "" },
    isLoading: false,
    errorMessage: "",
    isError: false,
    loginRequestStatus: "pending",
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.message = ""
        draft.email.value = action.value
        if (draft.email.value.length > 50) {
          draft.email.message = "Cannot be more than 50 characters"
          draft.email.hasErrors = true
        }
        break

      case "emailAfterDelay":
        if (draft.email.value !== "") {
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(draft.email.value.trim())) {
            draft.email.message = "Please use a valid email"
            draft.email.hasErrors = true
          }
        } else {
          draft.email.message = "Email cannot be empty"
          draft.email.hasErrors = true
        }
        break

      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.message = ""
        draft.password.value = action.value
        if (draft.password.value !== "") {
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
        draft.isError = false
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
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const emailField = useRef(null)

  // 1. Token Verification on Load
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Only verify if we have a token and a name param
      Axios.post(`${appState.backendURL}/verify-token/${name || "user"}`, { token: token })
        .then(response => {
          if (response.data) {
            appDispatch({ type: "login", token: token, userEmail: localStorage.getItem("userEmail") })
          }
          dispatch({ type: "loginRequestStatus" })
        })
        .catch(() => {
          dispatch({ type: "loginRequestStatus" })
        })
    } else {
      dispatch({ type: "loginRequestStatus" })
    }
  }, [name, appDispatch, appState.backendURL, dispatch])

  // 2. Email Validation Delay
  useEffect(() => {
    if (state.email.value !== "") {
      const delay = setTimeout(() => {
        dispatch({ type: "emailAfterDelay" })
      }, 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value, dispatch])

  // 3. Form Submission Logic (Moved out of Reducer)
  async function handleSubmit(e) {
    e.preventDefault()

    // Trigger immediate validation
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "passwordImmediately", value: state.password.value })

    if (!state.email.hasErrors && !state.password.hasErrors && state.email.value !== "") {
      dispatch({ type: "loading" })
      try {
        const response = await Axios.post(`${appState.backendURL}/login`, {
          email: state.email.value,
          password: state.password.value,
        })

        if (response.data.token) {
          dispatch({ type: "finishLoading" })
          // Global Login State Update
          appDispatch({ type: "login", token: response.data.token, userEmail: response.data.userEmail })
          // Success Navigation
          navigate(`/admin/dashboard/${name || "profile"}`)
        } else {
          dispatch({ type: "finishLoading" })
          dispatch({ type: "error", message: "Invalid login credentials" })
        }
      } catch (err) {
        dispatch({ type: "finishLoading" })
        dispatch({ type: "error", message: "Network error. Please try again later." })
      }
    }
  }

  function handleFocus(e) {
    e.target.style.border = "1px solid blue"
  }

  function handleBlur(e, field) {
    const hasError = field === "email" ? state.email.hasErrors : state.password.hasErrors
    if (!hasError && e.target.value !== "") {
      e.target.style.border = "1px solid #badbcc"
    } else if (hasError) {
      e.target.style.border = "1px solid #f5c2c7"
    } else {
      e.target.style.border = ""
    }
  }

  if (state.loginRequestStatus === "pending") {
    return <SmallLoading message="Loading data, please wait..." />
  }

  return (
    <>
      <div className="signup-instructor-container">
        <div className="main-login-container">
          <div className="main-login-container-inner">
            {state.isError && (
              <div className="login-error-cont">
                <p>{state.errorMessage}</p>
              </div>
            )}

            <div className="signup-instructor-sidebar2-header">
              <h2>Welcome Back!</h2>
              <p>Use your registered email and password to log into your account.</p>
            </div>

            <div className="login-sidebar">
              <form className="form-container" onSubmit={handleSubmit} method="POST">
                <label htmlFor="email">
                  <AnimatePresence>
                    {state.email.hasErrors && (
                      <motion.p animate={{ y: "-15px" }} exit={{ y: "5px" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="error-signup">
                        {state.email.message}
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <input ref={emailField} style={{ border: state.email.hasErrors ? "1px solid #dc3545" : {} }} onBlur={e => handleBlur(e, "email")} onFocus={handleFocus} onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} className="main-input" type="email" name="email" autoComplete="off" placeholder="Email Address" />
                </label>

                <label htmlFor="password">
                  <AnimatePresence>
                    {state.password.hasErrors && (
                      <motion.p animate={{ y: "-15px" }} exit={{ y: "5px" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="error-signup">
                        {state.password.message}
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <input style={{ border: state.password.hasErrors ? "1px solid #dc3545" : {} }} onBlur={e => handleBlur(e, "password")} onFocus={handleFocus} onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} className="main-input" type="password" name="password" autoComplete="off" placeholder="Password" />
                </label>

                <div className="admin-content-box-button">
                  <button className="action-button" style={{ background: "#4d54da", fontWeight: "bold", color: "#fff", border: "none", padding: state.isLoading ? "20px" : "" }}>
                    {state.isLoading ? (
                      <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBottom={"2px solid transparent"} />
                    ) : (
                      <>
                        <p>LOG ME IN</p>
                        <i className="bx bx-log-in"></i>
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
                  <div>Don't have an Account?</div>
                  <Link to="/apply">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
