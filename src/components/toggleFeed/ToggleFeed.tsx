import React from "react"
import { Button } from "reactstrap"
import { BsArrowLeftRight } from "react-icons/bs"
import "./ToggleFeed.css"
import { useDispatch, useSelector } from "react-redux"
import { toggleFeedSaga } from "../../redux/actions"
import { RootState } from "../../redux/reducers"
import { ETH, XBT } from "../../services/webSocket"

const ToggleFeed = () => {
  const dispatch = useDispatch()

  const crypto = useSelector((state: RootState) => state.crypto)

  return (
    <Button
      className="toggle-feed"
      onClick={() => {
        dispatch(toggleFeedSaga(crypto === XBT ? ETH : XBT))
      }}
    >
      <BsArrowLeftRight />
      Toggle Feed
    </Button>
  )
}

export default ToggleFeed
