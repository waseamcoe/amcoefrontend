import React from "react"
import { useImmer } from "use-immer"

export default function AddSubject(props) {
  const [state, setState] = useImmer({
    subject: { value: "", hasErrors: false, message: "" },
    grade: { value: "", hasErrors: false, message: "" },
    isSubmitting: false,
  })

  function addSubject(e) {
    e.preventDefault()
    if (state.subject.value != "---" && state.grade.value != "---" && state.subject.value && state.grade.value) {
      props.setState(draft => {
        draft.oLevel.examGrades.push({ subject: state.subject.value, grade: state.grade.value })
        setState(draft => {
          draft.subject.value = "---"
          draft.grade.value = "---"
        })
      })
    }
  }
  return (
    <div className="edit-row3 edit-row">
      <div className="input-field">
        <label className="text-font" htmlFor="subject">
          Subject
        </label>
        <select
          value={state.subject.value}
          id="subject"
          name="subject"
          onChange={e =>
            setState(draft => {
              draft.subject.value = e.target.value
            })
          }
        >
          <option>---</option>
          {props.subjects.map(ele => (
            <option>{ele}</option>
          ))}
        </select>
        <p className="error-msg-text"></p>
      </div>
      <div className="input-field">
        <label className="text-font" htmlFor="grade">
          Grades
        </label>
        <select
          value={state.grade.value}
          id="grade"
          name="grade"
          onChange={e =>
            setState(draft => {
              draft.grade.value = e.target.value
            })
          }
        >
          <option>---</option>
          {props.grades.map(ele => (
            <option>{ele}</option>
          ))}
        </select>
        <p className="error-msg-text"></p>
      </div>
      <div className="input-field">
        <div onClick={addSubject} className="edit-submit" style={{ marginBottom: "0" }}>
          <button className="action-button" style={{ background: "rgb(70, 128, 255)" }}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
