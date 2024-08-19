import React, { useContext, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useImmer } from "use-immer"
import Axios from "axios"

import EditStaff from "./Staff/EditStaff"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import SmallLoading from "../components/SmallLoading"
import Staff from "./Staff/Staff"
import School from "./School/School"
import EditSchool from "./School/EditSchool"
import News from "./News/News"
import EditNews from "./News/EditNews"
import Department from "./Department/Department"
import EditDepartment from "./Department/EditDepartment"

function AdminDashbboard() {
  const menu = useRef(null)
  const sidebar = useRef(null)
  const overlay = useRef(null)
  const name = useParams()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [state, setState] = useImmer({
    staff: [],
    schools: [],
    departments: [],
    news: [],
  })

  // functions
  function handleEdit(e) {
    switch (name.name) {
      case "staff":
        appDispatch({ type: "openEdit" })
        break
      case "schools":
        appDispatch({ type: "openEditSchool" })
        break
      case "departments":
        appDispatch({ type: "openEditDepartment" })
        break
      case "news":
        appDispatch({ type: "openEditNews" })
        break
    }
  }

  function handleCloseOverlay() {
    switch (name.name) {
      case "staff":
        appDispatch({ type: "closeEdit" })
        appDispatch({ type: "setEditUser", user: {} })
        break
      case "schools":
        appDispatch({ type: "closeEditSchool" })
        appDispatch({ type: "setEditSchool", school: {} })
        break
      case "department":
        appDispatch({ type: "closeEditDepartment" })
        appDispatch({ type: "setEditDepartment", department: {} })
        break
      case "news":
        appDispatch({ type: "closeEditNews" })
        appDispatch({ type: "setEditNews", news: {} })
        break
    }
  }

  function showSidebar() {
    sidebar.current.classList.remove("slideOut")
    overlay.current.classList.add("overlay")
    sidebar.current.classList.add("slideIn")
  }

  function hideSidebar() {
    overlay.current.classList.remove("overlay")
    sidebar.current.classList.add("slideOut")
    sidebar.current.classList.remove("slideIn")
  }

  // Effects
  useEffect(() => {
    // send axios request to fetch info base on the req.param which can be staff, schools ...
    Axios.get(`${appState.backendURL}/admin/dashboard/${name.name}`)
      .then(response => {
        switch (name.name) {
          case "staff":
            setState(draft => {
              // Reset the state data to empty for the sake of next rendering
              if (sidebar.current.classList.contains("slideIn")) {
                hideSidebar()
              }
              draft.schools = []
              draft.departments = []
              draft.news = []
              draft.staff = response.data
            })
            break
          case "schools":
            setState(draft => {
              // Reset the state data to empty for the sake of next rendering
              if (sidebar.current.classList.contains("slideIn")) {
                hideSidebar()
              }
              draft.staff = []
              draft.departments = []
              draft.news = []
              draft.schools = response.data
            })
            break
          case "departments":
            setState(draft => {
              // Reset the state data to empty for the sake of next rendering
              if (sidebar.current.classList.contains("slideIn")) {
                hideSidebar()
              }
              draft.staff = []
              draft.news = []
              draft.schools = []
              draft.departments = response.data
            })
            break
          case "news":
            setState(draft => {
              // Reset the state data to empty for the sake of next rendering
              if (sidebar.current.classList.contains("slideIn")) {
                hideSidebar()
              }
              draft.staff = []
              draft.departments = []
              draft.schools = []
              draft.news = response.data
            })
            break
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [name.name])

  return (
    <>
      {appState.isEditOpen || appState.isEditNewsOpen || appState.isEditSchoolOpen || appState.isEditDepartmentOpen ? <div onClick={handleCloseOverlay} className="staff-edit-overlay"></div> : ""}
      {appState.isEditOpen ? <EditStaff newStaff={true} setStaff={setState} staff={state.staff} /> : ""}
      {appState.isEditSchoolOpen ? <EditSchool setSchool={setState} school={state.schools} /> : ""}
      {appState.isEditNewsOpen ? <EditNews setNews={setState} news={state.news} /> : ""}
      {appState.isEditDepartmentOpen ? <EditDepartment setDepartment={setState} department={state.departments} /> : ""}
      <section className="admin-section">
        <div className="admin-cont">
          <nav ref={sidebar} className="admin-sidebar1">
            <div className="admin-sidebar1-head">
              <div className="admin-img-cont">
                <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg" alt="Admin Image" />
              </div>
              <div className="admin-name">
                <h4 className="heading-font">Admin Name</h4>
              </div>
            </div>
            <div className="admin-menus">
              <ul>
                <Link to={"/admin/dashboard/schools"}>
                  <i className="fa-solid fa-school"></i>
                  <li className="text-font">Schools</li>
                </Link>
                <Link to={"/admin/dashboard/staff"}>
                  <i className="fa-regular fa-user"></i>
                  <li className="text-font">Staff</li>
                </Link>
                <Link to={"/admin/dashboard/annoucement"}>
                  <i className="fa-solid fa-bullhorn"></i>
                  <li className="text-font">Annoucement</li>
                </Link>
                <Link to={"/admin/dashboard/news"}>
                  <i className="fa-regular fa-newspaper"></i>
                  <li className="text-font">News and Events</li>
                </Link>
                <Link to={"/admin/dashboard/departments"}>
                  <i className="fa-regular fa-newspaper"></i>
                  <li className="text-font">Departments</li>
                </Link>
              </ul>
            </div>
          </nav>
          <main className="admin-sidebar2">
            <div ref={overlay} onClick={hideSidebar}></div>
            <div className="admin-main-head">
              <div ref={menu} onClick={showSidebar} className="notification-cont admin-hamburger">
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className="notification-cont">
                <i className="fa-solid fa-bell"></i>
              </div>
            </div>
            <div className="admin-school-list-head">
              <button className="action-button" onClick={handleEdit}>
                <i class="fa-solid fa-plus"></i>
                <p className="text-font">{name.name === "staff" ? "Add Staff" : name.name == "schools" ? "Add Schools" : name.name === "news" ? "Add news" : name.name === "departments" ? "Add Department" : "Make Annoucement"}</p>
              </button>
            </div>
            {name.name === "schools" ? <div className="admin-school-list">{state.schools.length ? state.schools.map(school => <School newSchool={false} setState={setState} id={school._id} name={school.name} description={school.description} mission={school.mission} vision={school.vision} key={school._id} hod={school.hod} />) : <SmallLoading />}</div> : name.name === "staff" ? <div className="admin-school-list">{state.staff.length ? state.staff.map(staff => <Staff newStaff={false} setState={setState} title={staff.title} id={staff._id} pic={staff.pic} firstname={staff.firstname} lastname={staff.lastname} middlename={staff.middlename} email={staff.email} acadBio={staff.acadBio} gender={staff.gender} role={staff.role} school={staff.school} department={staff.department} key={staff._id} />) : <SmallLoading />}</div> : name.name === "news" ? <div className="admin-school-list">{state.news.length ? state.news.map(news => <News newSchool={false} setState={setState} id={news._id} head={news.head} body={news.body} date={news.date} pic={news.pic} />) : <SmallLoading />}</div> : name.name == "departments" ? <div className="admin-school-list">{state.departments.length ? state.departments.map(department => <Department setState={setState} id={department._id} name={department.name} description={department.description} mission={department.mission} vision={department.vision} departments={department.departments} key={department._id} hod={department.hod} />) : <SmallLoading />}</div> : ""}
          </main>
        </div>
      </section>
    </>
  )
}

export default AdminDashbboard
