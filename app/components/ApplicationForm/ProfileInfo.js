import Axios from "axios"
import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useImmer } from "use-immer"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import ApplicationHeader from "./ApplicationHeader"
import BioData from "./BioData"
import OlevelInfo from "./OlevelInfo"

export default function ProfileInfo(props) {
  const params = useParams()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer({
    isSubmitting: false,
    page: "bio-data",
  })

  return (
    <>
      <ApplicationHeader page={state.page} setState={setState} />
      {state.page == "bio-data" ? <BioData /> : state.page == "olevel" ? <OlevelInfo state={props.state} setState={props.setState} grades={props.grades} subjects={props.subjects} /> : ""}
    </>
  )
}
