import React from "react"
import { Button } from "reactstrap"
import { BsExclamationCircle } from "react-icons/bs"
import "./KillFeed.css"
import { killFeedSaga } from "../../redux/actions"
import { useDispatch } from "react-redux"

const KillFeed = () => {
  const dispatch = useDispatch()

  return (
    <Button
      className="kill-feed"
      color="danger"
      onClick={() => {
        dispatch(killFeedSaga())
      }}
    >
      <BsExclamationCircle />
      Kill Feed
    </Button>
  )
}

export default KillFeed
