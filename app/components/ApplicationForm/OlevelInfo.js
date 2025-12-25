import Axios from "axios"
import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { useImmer } from "use-immer"
import AddSubject from "./AddSubject"
import StateContext from "../../StateContext"
import SmallLoading from "../SmallLoading"
import DispatchContext from "../../DispatchContext"

export default function OlevelInfo(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const id = useParams()
  const [state, setState] = useImmer({
    oLevel: {
      sitting: 1,
      examType: "",
      examYear: null,
      examCenter: "",
      examNo: "",
      examGrades: [],
    },
    isSubmitting: false,
  })

  async function saveOlevel(e) {
    e.preventDefault()
    setState(draft => {
      draft.isSubmitting = true
    })
    if (state.oLevel.examGrades.length) {
      Axios.post(`${appState.backendURL}/save-olevel`, {
        oLevel: state.oLevel,
        id: id.id,
      })
        .then(data => {
          appDispatch({ type: "setFlashMessage", message: "O-level Records have been saved successfully" })
          appDispatch({ type: "showSuccessAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
          //  send the user to the next page
        })
        .catch(err => {
          appDispatch({ type: "setFlashMessage", message: "Something went wrong, try again later" })
          appDispatch({ type: "showDangerAlert" })
          setState(draft => {
            draft.isSubmitting = false
          })
        })
    }
  }
  return (
    <>
      <form onSubmit={saveOlevel}>
        <div className="application-page1">
          <AddSubject state={state} setState={setState} subjects={props.subjects} grades={props.grades} />
          {state.oLevel.examGrades.length ? (
            <div className="table-body">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>
                      <h4>#</h4>
                    </th>

                    <th>
                      <h4>Subject</h4>
                    </th>

                    <th>
                      <h4>Grade</h4>
                    </th>

                    <th>
                      <h4>Action</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.oLevel.examGrades.map((subject, index) => (
                    <tr>
                      <td>
                        <p className="text-truncate">{index + 1}</p>
                      </td>
                      <td>
                        <p className="text-truncate">{subject.subject}</p>
                      </td>
                      <td>{subject.grade}</td>
                      <td className="table-actions">
                        <div className="action-cont">
                          <div className="action-delete" title="Delete">
                            <i className="bx bx-trash"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          <div className="edit-submit">
            <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
              {state.isSubmitting ? (
                <>
                  <SmallLoading width={"20px"} height={"20px"} border={"2px solid #fff"} borderBotton={"2px solid transparent"} transform={"none"} marginRight={"5px"} position={"none"} />
                  Saving...
                </>
              ) : (
                "Save and Proceed"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
