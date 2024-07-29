import React from "react"

const Button = ({ label, background, myclass }) => {
  return (
    <button className={`button ${myclass}`} style={{ background }}>
      {label}
    </button>
  )
}

export default Button
