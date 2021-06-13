import React from "react"
import { Button } from "reactstrap"
import { BsExclamationCircle } from "react-icons/bs"
import "./KillFeed.css"

const KillFeed = () => {
  return (
    <Button className="kill-feed" color="danger" onClick={() => {}}>
      <BsExclamationCircle />
      Kill Feed
    </Button>
  )
}

export default KillFeed
