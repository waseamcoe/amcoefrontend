import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// components
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import About from "./components/About"
import VisionAndMission from "./components/VisionAndMission"
import SingleDeptPage from "./components/SingleDeptPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/vision-and-mission" element={<VisionAndMission />} />
          <Route path="/history-of-amcoe" element={<About />} />
          <Route path="/department-of-social-studies" element={<SingleDeptPage />} />
          <Route path="/department/:name" element={<SingleDeptPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
