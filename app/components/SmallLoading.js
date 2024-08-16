import React from "react"

function SmallLoading(props) {
  return (
    <div className="loading-cont">
      <div className="loading-small" style={{ width: props.width, height: props.height, color: props.color, border: props.border, borderBottom: props.borderBottom }}></div>
    </div>
  )
}

export default SmallLoading
