import React, { useState, useContext } from "react"
import Axios from "axios"
import StateContext from "../../StateContext"
import SmallLoading from "../SmallLoading"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import Navigation from "../Navigation"

function CheckStatus() {
  const appState = useContext(StateContext)
  const [regNo, setRegNo] = useState("")
  const [status, setStatus] = useState(null) // null, 'loading', 'admitted', 'pending', 'not-found'
  const [studentData, setStudentData] = useState(null)

  async function handleSearch(e) {
    e.preventDefault()
    if (!regNo) return

    setStatus("loading")
    try {
      const response = await Axios.get(`${appState.backendURL}/check-status/${regNo}`)
      if (response.data) {
        setStudentData(response.data)
        setStatus(response.data.admissionStatus) // 'admitted' or 'pending'
      } else {
        setStatus("not-found")
      }
    } catch (err) {
      setStatus("not-found")
    }
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="bx bxs-graduation text-3xl text-blue-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admission Status</h2>
            <p className="text-gray-500 text-sm mt-2">Enter your registration number Below</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input type="text" placeholder="e.g. AMCOE/2025/1234" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono" onChange={e => setRegNo(e.target.value)} />
            </div>
            <button className="w-full relative bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center" disabled={status === "loading"}>
              {status === "loading" ? <SmallLoading width="20px" height="20px" /> : "CHECK STATUS"}
            </button>
          </form>

          <AnimatePresence>
            {status && status !== "loading" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-lg border text-center">
                {status === "admitted" ? (
                  <div className="bg-green-50 border-green-100">
                    <i className="bx bxs-party text-4xl text-green-500 mb-2"></i>
                    <h3 className="text-green-800 font-bold text-lg">Congratulations!</h3>
                    <p className="text-green-700 text-sm mb-2">Dear Inuwa, you have been offered provisional admission.</p>
                    <Link to="/apply" className="mt-4 text-xs font-bold bg-green-500 text-white px-4 py-2 rounded-lg">
                      KINDLY PROCEED TO CREATE AN ACCOUNT
                    </Link>
                  </div>
                ) : status === "pending" ? (
                  <div className="bg-amber-50 border-amber-100">
                    <i className="bx bx-time-five text-4xl text-amber-500 mb-2"></i>
                    <h3 className="text-amber-800 font-bold text-lg">Processing...</h3>
                    <p className="text-amber-700 text-sm">Your application is still under review. Please check back later.</p>
                  </div>
                ) : (
                  <div className="bg-red-50 border-red-100">
                    <i className="bx bx-error-circle text-4xl text-red-500 mb-2"></i>
                    <h3 className="text-red-800 font-bold text-lg">Record Not Found</h3>
                    <p className="text-red-700 text-sm">Please verify your registration number and try again.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>{" "}
    </>
  )
}

export default CheckStatus
