import React from "react"
import { Button } from "reactstrap"
import { BsArrowLeftRight } from "react-icons/bs"
import "./ToggleFeed.css"

const ToggleFeed = () => {
  return (
    <Button className="toggle-feed" onClick={() => {}}>
      <BsArrowLeftRight />
      ToggleFeed
    </Button>
  )
}

export default ToggleFeed
