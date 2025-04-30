import React, { useContext, useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { CategoryScale } from "chart.js/auto"
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import SmallLoading from "./SmallLoading"

function AdminCharts() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [dashboardData, setDashboardData] = useState([])
  const [chartData, setChartData] = useState({
    labels: ["Staff", "Schools", "Annoucement", "News", "Departments"],
    datasets: [
      {
        label: "No. of staff ",
        data: [],
        backgroundColor: ["rgba(75,192,192,1)", "&quot;#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
        borderColor: "ccc",
        borderWidth: 0,
      },
    ],
  })

  function fetchData(name) {
    return new Promise((resolve, reject) => {
      Axios.post(`${appState.backendURL}/admin/dashboard/${name}`, { token: localStorage.getItem("token") })
        .then(response => {
          resolve(response.data)
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
    })
  }

  useEffect(() => {
    async function fetch() {
      const staff = await fetchData("staff")
      const schools = await fetchData("schools")
      const annoucement = await fetchData("annoucement")
      const news = await fetchData("news")
      const departments = await fetchData("departments")
      Promise.all([staff, schools, annoucement, news, departments])
        .then(data => {
          setChartData({
            labels: chartData.labels,
            datasets: [
              {
                label: "No. of staff ",
                data: data.map(d => d.length),
                backgroundColor: ["rgba(75,192,192,1)", "#506646 ", "#50AF95", "#f3ba2f", "#2a71d0"],
                borderColor: "ccc",
                borderWidth: 0,
              },
            ],
          })
          console.log(data.map(d => d.length))
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
    }
    fetch()
  }, [])

  return dashboardData ? (
    <div className="chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "College statistics and activity",
              borderWidth: 1,
            },
            legend: {
              display: true,
            },
          },
          cutout: 100,
        }}
      />
    </div>
  ) : (
    <SmallLoading />
  )
}

export default AdminCharts
