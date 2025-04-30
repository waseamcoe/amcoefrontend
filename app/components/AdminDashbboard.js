import React, { useContext, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useImmer } from "use-immer"
import Axios from "axios"
import { CSSTransition } from "react-transition-group"

import EditStaff from "./Staff/EditStaff"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import SmallLoading from "../components/SmallLoading"
import Staff from "./Staff/Staff"
import School from "./School/School"
import EditSchool from "./School/EditSchool"
import News from "./News/News"
import Annoucement from "./Annoucements/Annoucement"
import EditNews from "./News/EditNews"
import EditAnnoucement from "./Annoucements/EditAnnoucement"
import Department from "./Department/Department"
import EditDepartment from "./Department/EditDepartment"
import FlashMessage from "./ReusableComp/FlashMessage"
import AdminCharts from "./AdminCharts"

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
    annoucement: [],
    dashboard: [],
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
      case "annoucement":
        appDispatch({ type: "openEditAnnoucement" })
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
      case "annoucement":
        appDispatch({ type: "closeEditAnnoucement" })
        appDispatch({ type: "setEditAnnoucement", annoucement: {} })
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
    Axios.post(`${appState.backendURL}/admin/dashboard/${name.name}`, { token: localStorage.getItem("token") })
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
              draft.annoucement = []
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
              draft.annoucement = []
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
              draft.annoucement = []
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
              draft.annoucement = []
              draft.news = response.data
            })
            break
          case "annoucement":
            setState(draft => {
              // Reset the state data to empty for the sake of next rendering
              if (sidebar.current.classList.contains("slideIn")) {
                hideSidebar()
              }
              draft.staff = []
              draft.departments = []
              draft.schools = []
              draft.news = []
              draft.annoucement = response.data
            })
            break
          case "dashboard":
            setState(draft => {
              // Reset the state data to empty for the sake of next rendering
              if (sidebar.current.classList.contains("slideIn")) {
                hideSidebar()
              }
              draft.staff = []
              draft.departments = []
              draft.schools = []
              draft.news = []
              draft.annoucement = []
            })
            break
        }
      })
      .catch(err => {
        console.log(err)
        if ((err.message = "Network Error")) {
          appDispatch({ type: "setFlashMessage", message: "Ooops, Please check your network and try again" })
          appDispatch({ type: "showDangerAlert" })
        } else {
          appDispatch({ type: "setFlashMessage", message: "We ran into a problem, contact our suppose please" })
          appDispatch({ type: "showDangerAlert" })
        }
      })
  }, [name.name])

  return (
    <>
      <CSSTransition in={appState.alertDanger || appState.alertSucess} timeout={300} classNames={"show-flash"} unmountOnExit>
        <FlashMessage message={appState.flashMessage} myclass={appState.alertDanger ? "alert-danger" : "alert-success"} />
      </CSSTransition>
      {appState.isEditOpen || appState.isEditNewsOpen || appState.isEditSchoolOpen || appState.isEditDepartmentOpen || appState.isEditAnnoucementOpen ? <div onClick={handleCloseOverlay} className="staff-edit-overlay"></div> : ""}
      {appState.isEditOpen ? <EditStaff setStaff={setState} staff={state.staff} /> : ""}
      {appState.isEditSchoolOpen ? <EditSchool setSchool={setState} school={state.schools} /> : ""}
      {appState.isEditNewsOpen ? <EditNews setNews={setState} news={state.news} /> : ""}
      {appState.isEditAnnoucementOpen ? <EditAnnoucement setAnnoucement={setState} annoucement={state.annoucement} /> : ""}
      {appState.isEditDepartmentOpen ? <EditDepartment setDepartment={setState} department={state.departments} /> : ""}
      <section className="admin-section">
        <div className="admin-cont" style={state.showDialog ? { filter: "blur(2px)" } : {}}>
          <nav ref={sidebar} className="admin-sidebar1">
            <div className="admin-sidebar1-head">
              <div className="admin-img-cont">
                <img src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg" alt="Admin Image" />
              </div>
              <div className="admin-name">
                <h4 className="heading-font">{localStorage.getItem("userEmail")}</h4>
              </div>
            </div>
            <div className="admin-menus">
              <ul>
                <Link to={"/admin/dashboard/dashboard"} style={name.name == "dashboard" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="bx bx-bar-chart-alt-2"></i>
                  <li className="text-font" style={name.name == "dashboard" ? { color: "#fff" } : {}}>
                    Dashboard
                  </li>
                </Link>
                <Link to={"/admin/dashboard/schools"} style={name.name == "schools" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="bx bxs-school"></i>
                  <li className="text-font" style={name.name == "schools" ? { color: "#fff" } : {}}>
                    Schools
                  </li>
                </Link>
                <Link to={"/admin/dashboard/staff"} style={name.name == "staff" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-regular fa-user"></i>
                  <li className="text-font" style={name.name == "staff" ? { color: "#fff" } : {}}>
                    Staff
                  </li>
                </Link>
                <Link to={"/admin/dashboard/annoucement"} style={name.name == "annoucement" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-solid fa-bullhorn"></i>
                  <li className="text-font" style={name.name == "annoucement" ? { color: "#fff" } : {}}>
                    Annoucement
                  </li>
                </Link>
                <Link to={"/admin/dashboard/news"} style={name.name == "news" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-regular fa-newspaper"></i>
                  <li className="text-font" style={name.name == "news" ? { color: "#fff" } : {}}>
                    News and Events
                  </li>
                </Link>
                <Link to={"/admin/dashboard/departments"} style={name.name == "departments" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-solid fa-bullhorn"></i>
                  <li className="text-font" style={name.name == "departments" ? { color: "#fff" } : {}}>
                    Departments
                  </li>
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
              <div className="notification-sidebar2">
                <div className="notification-cont">
                  <i className="bx bx-message-detail"></i>
                  {/* <div className="dialog-cont">
                    <div className="dialog-head">
                      <div className="dialog-head-text">
                        <h3 className="heading-font">Notification</h3>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="notification-cont">
                  <i className="bx bx-bell"></i>
                </div>
                <div className="notification-cont" title={localStorage.getItem("userEmail")}>
                  <i className="bx bx-user"></i>
                </div>
              </div>
            </div>
            <div className="admin-sidebar-main-cont">
              <div className="admin-sidebar-Dashboard">
                <h2 className="heading-font">Dashboard</h2>
                <p className="text-font">
                  <span style={{ color: "rgb(70, 128, 255)" }}>Home</span> / {name.name == "dashboard" ? "Dashboard" : name.name == "schools" ? "Schools" : name.name == "departments" ? "Departments" : name.name == "staff" ? "Staff" : name.name == "annoucement" ? "Annoucements" : name.name == "news" ? "News and Events" : ""}
                </p>
              </div>
              {name.name === "schools" ? (
                // <div className="admin-school-list">{state.schools.length ? state.schools.map(school => <School state={state} newSchool={false} setState={setState} id={school._id} name={school.name} description={school.description} mission={school.mission} vision={school.vision} key={school._id} hod={school.hod} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">School record({state.schools.length ? state.schools.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add School</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Name</h4>
                            </th>

                            <th>
                              <h4>Description</h4>
                            </th>
                            <th>
                              <h4>Mission</h4>
                            </th>
                            <th>
                              <h4>Vision</h4>
                            </th>
                            <th>
                              <h4>HOD</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.schools.length ? state.schools.map((school, index) => <School index={index + 1} state={state} setState={setState} name={school.name} description={school.description} mission={school.mission} id={school._id} vision={school.vision} key={school._id} hod={school.hod} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name === "staff" ? (
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">Staff record({state.staff.length ? state.staff.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add Staff</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Title</h4>
                            </th>

                            <th>
                              <h4>Picture</h4>
                            </th>
                            <th>
                              <h4>Fullname</h4>
                            </th>
                            <th>
                              <h4>Role</h4>
                            </th>
                            <th>
                              <h4>Gender</h4>
                            </th>
                            <th>
                              <h4>Department</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.staff.length ? state.staff.map((staff, index) => <Staff index={index + 1} state={state} setState={setState} title={staff.title} pic={staff.pic} gender={staff.gender} id={staff._id} firstName={staff.firstname} lastName={staff.lastname} middleName={staff.middlename} email={staff.email} role={staff.role} key={staff._id} department={staff.department} school={staff.school} acadBio={staff.acadBio} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name === "news" ? (
                // <div className="admin-school-list">{state.news.length ? state.news.map(news => <News newSchool={false} setState={setState} id={news._id} head={news.head} body={news.body} date={news.date} pic={news.pic} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">News record({state.news.length ? state.news.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add News</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Head</h4>
                            </th>

                            <th>
                              <h4>Body</h4>
                            </th>
                            <th>
                              <h4>Date</h4>
                            </th>
                            <th>
                              <h4>Pic</h4>
                            </th>
                            <th>
                              <h4>id</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.news.length ? state.news.map((news, index) => <News index={index + 1} state={state} setState={setState} head={news.head} body={news.body} date={news.date} id={news._id} pic={news.pic} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name == "departments" ? (
                // <div className="admin-school-list">{state.departments.length ? state.departments.map(department => <Department setState={setState} id={department._id} name={department.name} description={department.description} mission={department.mission} vision={department.vision} departments={department.departments} key={department._id} hod={department.hod} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">Department record({state.departments.length ? state.departments.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add School</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Name</h4>
                            </th>

                            <th>
                              <h4>Description</h4>
                            </th>
                            <th>
                              <h4>Mission</h4>
                            </th>
                            <th>
                              <h4>Vision</h4>
                            </th>
                            <th>
                              <h4>HOD</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.departments.length ? state.departments.map((department, index) => <Department index={index + 1} state={state} setState={setState} name={department.name} description={department.description} mission={department.mission} id={department._id} vision={department.vision} key={department._id} hod={department.hod} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name == "annoucement" ? (
                // <div className="admin-school-list">{state.news.length ? state.news.map(news => <News newSchool={false} setState={setState} id={news._id} head={news.head} body={news.body} date={news.date} pic={news.pic} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">Announcement record({state.annoucement.length ? state.annoucement.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Make Annoucement</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Head</h4>
                            </th>

                            <th>
                              <h4>Body</h4>
                            </th>
                            <th>
                              <h4>Date</h4>
                            </th>
                            <th>
                              <h4>Pic</h4>
                            </th>
                            <th>
                              <h4>id</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.annoucement.length ? state.annoucement.map((annoucement, index) => <Annoucement index={index + 1} state={state} setState={setState} head={annoucement.head} body={annoucement.body} date={annoucement.date} id={annoucement._id} pic={annoucement.pic} announceNotification={annoucement.announceNotification} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name == "dashboard" ? (
                <AdminCharts />
              ) : (
                ""
              )}
            </div>
          </main>
        </div>
      </section>
    </>
  )
}

export default AdminDashbboard
