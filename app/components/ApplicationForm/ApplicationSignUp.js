import React, { useContext, useEffect, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion" // Fixed import name
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import { CSSTransition } from "react-transition-group"
import SmallLoading from "../SmallLoading"
import Navigation from "../Navigation"

function ApplicationSignUp() {
  const navigate = useNavigate()
  const params = useParams() // Separate from refs
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const initialState = {
    email: { value: "", hasErrors: false, message: "" },
    firstName: { value: "", hasErrors: false, message: "" },
    lastName: { value: "", hasErrors: false, message: "" },
    phone: { value: "", hasErrors: false, message: "" },
    middleName: { value: "", hasErrors: false, message: "" },
    password: { value: "", hasErrors: false, message: "" },
    isLoading: false,
    errorMessage: "",
    isError: false,
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.value = action.value
        if (draft.email.value.length > 50) {
          draft.email.message = "Cannot be more than 50 characters"
          draft.email.hasErrors = true
        }
        break
      case "emailAfterDelay":
        if (!/^\S+@\S+\.\S+$/.test(draft.email.value)) {
          draft.email.message = "Please use a valid email"
          draft.email.hasErrors = true
        }
        break
      case "firstNameImmediately":
        draft.firstName.hasErrors = false
        draft.firstName.value = action.value
        if (draft.firstName.value.length === 0) {
          draft.firstName.hasErrors = true
          draft.firstName.message = "First name is required"
        }
        break
      case "lastNameImmediately":
        draft.lastName.hasErrors = false
        draft.lastName.value = action.value
        if (draft.lastName.value.length === 0) {
          draft.lastName.hasErrors = true
          draft.lastName.message = "Last name is required"
        }
        break
      case "middleNameImmediately":
        draft.middleName.value = action.value
        break
      case "phoneImmediately":
        draft.phone.hasErrors = false
        draft.phone.value = action.value
        if (!/^\d+$/.test(action.value)) {
          draft.phone.message = "Numbers only please"
          draft.phone.hasErrors = true
        }
        break
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        if (draft.password.value.length < 8) {
          draft.password.message = "Must be at least 8 characters"
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
        draft.isError = true
        draft.errorMessage = action.value
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // Validation Delay for Email
  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  async function handleSubmit(e) {
    e.preventDefault()

    // Final Validation Check
    dispatch({ type: "firstNameImmediately", value: state.firstName.value })
    dispatch({ type: "lastNameImmediately", value: state.lastName.value })
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "passwordImmediately", value: state.password.value })

    if (!state.firstName.hasErrors && !state.lastName.hasErrors && !state.email.hasErrors && !state.password.hasErrors && state.email.value !== "") {
      dispatch({ type: "loading" })
      try {
        const response = await Axios.post(`${appState.backendURL}/create-student-account`, {
          firstName: state.firstName.value,
          lastName: state.lastName.value,
          middleName: state.middleName.value,
          phone: state.phone.value,
          email: state.email.value,
          password: state.password.value,
        })

        if (response.data) {
          // 1. Update Global Auth State
          appDispatch({ type: "login", token: response.data.token, userEmail: response.data.email })

          // 2. Show Success Message
          appDispatch({ type: "setFlashMessage", message: "Account created! Please complete your profile." })
          appDispatch({ type: "showSuccessAlert" })

          // 3. Redirect
          navigate(`/student/dashboard/${response.data.insertedId}/profile`)
        }
      } catch (err) {
        dispatch({ type: "finishLoading" })
        dispatch({ type: "error", value: err.response?.data || "Something went wrong. Please try again." })
      }
    }
  }

  function handleFocus(e) {
    e.target.style.border = "1px solid #4d54da"
  }

  function handleBlur(e, fieldHasErrors) {
    e.target.style.border = fieldHasErrors ? "1px solid #dc3545" : "1px solid #ced4da"
  }

  return (
    <>
      <Navigation />
      <div className="signup-instructor-container">
        <div className="main-login-container">
          <div className="main-login-container-inner">
            {state.isError && (
              <div className="login-error-cont">
                <p>{state.errorMessage}</p>
              </div>
            )}

            <div className="signup-instructor-sidebar2-header">
              <h2>Create an Account</h2>
              <p>To begin your application, kindly create an account below</p>
            </div>

            <div className="login-sidebar">
              <form className="form-container" onSubmit={handleSubmit}>
                {/* First Name */}
                <label>
                  <AnimatePresence>
                    {state.firstName.hasErrors && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -5 }} className="error-signup">
                        {state.firstName.message} <i className="fa-solid fa-triangle-exclamation"></i>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <input autoFocus onFocus={handleFocus} onBlur={e => handleBlur(e, state.firstName.hasErrors)} onChange={e => dispatch({ type: "firstNameImmediately", value: e.target.value })} className="main-input" type="text" placeholder="First Name" />
                </label>

                {/* Last Name */}
                <label>
                  <AnimatePresence>
                    {state.lastName.hasErrors && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -5 }} className="error-signup">
                        {state.lastName.message} <i className="fa-solid fa-triangle-exclamation"></i>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <input onFocus={handleFocus} onBlur={e => handleBlur(e, state.lastName.hasErrors)} onChange={e => dispatch({ type: "lastNameImmediately", value: e.target.value })} className="main-input" type="text" placeholder="Last Name" />
                </label>

                {/* Email */}
                <label>
                  <AnimatePresence>
                    {state.email.hasErrors && (
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -5 }} className="error-signup">
                        {state.email.message} <i className="fa-solid fa-triangle-exclamation"></i>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <input onFocus={handleFocus} onBlur={e => handleBlur(e, state.email.hasErrors)} onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} className="main-input" type="email" placeholder="Email Address" />
                </label>

                {/* Phone */}
                <label>
                  <CSSTransition in={state.phone.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                    <p className="error-signup">{state.phone.message}</p>
                  </CSSTransition>
                  <input onFocus={handleFocus} onBlur={e => handleBlur(e, state.phone.hasErrors)} onChange={e => dispatch({ type: "phoneImmediately", value: e.target.value })} className="main-input" type="text" placeholder="Phone Number" />
                </label>

                {/* Password */}
                <label>
                  <CSSTransition in={state.password.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                    <p className="error-signup">{state.password.message}</p>
                  </CSSTransition>
                  <input onFocus={handleFocus} onBlur={e => handleBlur(e, state.password.hasErrors)} onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} className="main-input" type="password" autoComplete="new-password" placeholder="Create Password" />
                </label>

                <div className="admin-content-box-button">
                  <button disabled={state.isLoading} className="action-button" style={{ background: "#4d54da", color: "#fff" }}>
                    {state.isLoading ? <SmallLoading width="20px" height="20px" border="2px solid #fff" /> : "CREATE AN ACCOUNT"}
                  </button>
                </div>
              </form>

              <div className="login-footer">
                <div className="forget-password">
                  <div>Already have an account?</div>
                  <Link to="/login">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicationSignUp
