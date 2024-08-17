import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

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
const SingleDeptPage = React.lazy(() => import("./components/SingleDeptPage"))

function App() {
  const initialState = {
    isNavOpen: false,
    isEditOpen: false,
    isEditNewsOpen: false,
    isEditSchoolOpen: false,
    isEditDepartmentOpen: false,
    backendURL: "https://waseamcoe.onrender.com",
    user: {},
    school: {},
    news: {},
    department: {},
  }

  function reducer(draft, action) {
    switch (action.type) {
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
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)
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
              <Route path="/admin/dashboard/:name" element={<AdminDashbboard />} />
              <Route path="/news/:title/:id" element={<SingleNewsPage />} />
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
