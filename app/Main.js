import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import "./style.css"

// components
import Home from "./components/Home"
import About from "./components/About"
import VisionAndMission from "./components/VisionAndMission"
import Loading from "./components/Loading"
import { Suspense } from "react"
import PageNotFound from "./components/PageNotFound"
import SingleNewsPage from "./components/SingleNewsPage"
import AdminDashbboard from "./components/AdminDashbboard"
import { useImmerReducer } from "use-immer"
import SingleSchoolPage from "./components/SingleSchoolPage"
import Loginpage from "./components/Staff/LoginPage"
import ApplicationForm from "./components/ApplicationForm/ApplicationForm"
import CheckStatus from "./components/ApplicationForm/ChechStatus"
const SingleDeptPage = React.lazy(() => import("./components/SingleDeptPage"))

function App() {
  const initialState = {
    isNavOpen: false,
    isEditOpen: false,
    isEditNewsOpen: false,
    isEditAnnoucementOpen: false,
    isEditSchoolOpen: false,
    isEditDepartmentOpen: false,
    isLogin: Boolean(localStorage.getItem("token")),
    backendURL: "https://waseamcoe.onrender.com",
    // backendURL: "http://10.64.42.77:8000",
    user: {},
    school: {},
    news: {},
    annoucement: {},
    department: {},
    allNews: [],
    alertDanger: false,
    alertSucess: false,
    flashMessage: "",
    showPopUp: false,
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "login":
        localStorage.setItem("token", action.token)
        localStorage.setItem("userEmail", action.userEmail)
        draft.isLogin = true
        break
      case "openNav":
        draft.isNavOpen = true
        break
      case "closeNav":
        draft.isNavOpen = false
        break
      case "openEdit":
        draft.isEditOpen = true
        break
      case "closeEdit":
        draft.isEditOpen = false
        // this is for the admin update user
        draft.user = {}
        break
      case "setEditUser":
        draft.user = action.user
        break

      // school settings
      case "openEditSchool":
        draft.isEditSchoolOpen = true
        break
      case "closeEditSchool":
        draft.isEditSchoolOpen = false
        draft.school = {}
        break
      case "setEditSchool":
        draft.school = action.school
        break

      // department settings
      case "openEditDepartment":
        draft.isEditDepartmentOpen = true
        break
      case "closeEditDepartment":
        draft.isEditDepartmentOpen = false
        draft.department = {}
        break
      case "setEditDepartment":
        draft.department = action.department
        break

      // News settings
      case "openEditNews":
        draft.isEditNewsOpen = true
        break
      case "closeEditNews":
        draft.isEditNewsOpen = false
        draft.news = {}
        break
      case "setEditNews":
        draft.news = action.news
        break

      // Annooucements settings
      case "openEditAnnoucement":
        draft.isEditAnnoucementOpen = true
        break
      case "closeEditAnnoucement":
        draft.isEditAnnoucementOpen = false
        draft.annoucement = {}
        break
      case "setEditAnnoucement":
        draft.annoucement = action.annoucement
        break

      // setting for flash messages
      case "setFlashMessage":
        draft.flashMessage = action.message
        break
      case "showDangerAlert":
        draft.alertDanger = true
        break
      case "showSuccessAlert":
        draft.alertSucess = true
        break
      case "hideDangerAlert":
        draft.alertDanger = false
        break
      case "hideSuccessAlert":
        draft.alertSucess = false
        break

      // Notification pop up settings
      case "closePopUp":
        draft.showPopUp = false
        break
      case "openPopUp":
        draft.showPopUp = true
        break

      // All news settings
      case "setNews":
        draft.allNews = action.data
        break
    }
  }
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // components effects
  useEffect(() => {
    setTimeout(() => {
      if (state.alertDanger) {
        dispatch({ type: "hideDangerAlert" })
      }
      if (state.alertSucess) {
        dispatch({ type: "hideSuccessAlert" })
      }
    }, 5000)
  }, [state.alertDanger, state.alertSucess])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/vision-and-mission" element={<VisionAndMission />} exact />
              <Route path="/history-of-amcoe" element={<About />} exact />
              <Route path="/department/:id" element={<SingleDeptPage />} />
              <Route path="/school/:id" element={<SingleSchoolPage />} />
              <Route path="/apply" element={<ApplicationForm />} />
              <Route path="/check-status" element={<CheckStatus />} />
              <Route path="/admin/dashboard/:name" element={state.isLogin ? <AdminDashbboard /> : <Loginpage />} />
              <Route path="/student/dashboard/:id/:name" element={<AdminDashbboard />} />
              <Route path="/news/:id" element={<SingleNewsPage isNews={true} />} />
              <Route path="/annoucement/:id" element={<SingleNewsPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
