import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

// components
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import About from "./components/About"
import VisionAndMission from "./components/VisionAndMission"
import Loading from "./components/Loading"
import { Suspense } from "react"
import PageNotFound from "./components/PageNotFound"
import SingleNewsPage from "./components/SingleNewsPage"
const SingleDeptPage = React.lazy(() => import("./components/SingleDeptPage"))

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/vision-and-mission" element={<VisionAndMission />} exact />
            <Route path="/history-of-amcoe" element={<About />} exact />
            <Route path="/department/:name" element={<SingleDeptPage />} />
            <Route path="/school/:name" element={<SingleDeptPage />} />
            <Route path="/news/:title/:id" element={<SingleNewsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
