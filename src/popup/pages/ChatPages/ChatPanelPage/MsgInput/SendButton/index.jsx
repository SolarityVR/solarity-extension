import React from "react"
import { Send } from "../../../../../components/Icons"

const SendButton = (props) => {
  return (
    <div className="flex cursor-pointer " onClick={props.onClick}>
      <Send />
    </div>
  )
}

export default SendButton