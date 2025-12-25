import React from "react"

export default function ApplicationHeader(props) {
  return (
    <div className="staff-edit-head">
      <div className="application-main-heading">
        <h4 className="heading-font">APPLICATION FORM</h4>
        <p className="text-font">I hereby declare that all the information I supplied in this bio-data is, to the best of my knowledge and belief, accurate in every detail misrepresentation may result in the denial or cancellation of admission.</p>
      </div>
      <div className="staff-edit-head-flex">
        <div
          className="personal-info"
          style={props.page == "bio-data" ? { border: "1px solid #f1f1f1", borderBottom: "none", background: "#f1f1f1" } : {}}
          onClick={() => {
            props.setState(draft => {
              draft.page = "bio-data"
            })
          }}
        >
          <div className="apply-sec-head">
            <h4 className="heading-font">Bio-data</h4>
          </div>
        </div>
        <div
          className="address-info"
          style={props.page == "olevel" ? { border: "1px solid #f1f1f1", borderBottom: "none", background: "#f1f1f1" } : {}}
          onClick={() => {
            props.setState(draft => {
              draft.page = "olevel"
            })
          }}
        >
          <div className="apply-sec-head">
            <h4 className="heading-font">O-Level</h4>
          </div>
        </div>
        <div className="address-info">
          <div className="apply-sec-head">
            <h4 className="heading-font">Address</h4>
          </div>
        </div>
        <div className="address-info">
          <div className="apply-sec-head">
            <h4 className="heading-font">Next of Kin</h4>
          </div>
        </div>
        <div className="address-info">
          <div className="apply-sec-head">
            <h4 className="heading-font">Passport</h4>
          </div>
        </div>
        <div className="address-info">
          <div className="apply-sec-head">
            <h4 className="heading-font">Sponsors</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
