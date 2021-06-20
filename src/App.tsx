import React, { useEffect } from "react"
import "./App.css"
import GroupSelectBox from "./components/groupSelectBox/GroupSelectBox"
import Orderbook from "./components/orderbook/Orderbook"
import ToggleFeed from "./components/toggleFeed/ToggleFeed"
import KillFeed from "./components/killFeed/KillFeed"
import { useDispatch, useSelector } from "react-redux"
import { initAppSaga } from "./redux/actions"
import { RootState } from "./redux/reducers"

const App = () => {
  const dispatch = useDispatch()
  const crypto = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    dispatch(initAppSaga())
  }, [])

  return (
    <div className="App">
      <div className="orderbook-container">
        <div className="orderbook-header">
          <span>Order Book</span>
          <span id="crypto-name">{crypto ? crypto.substring(3) : null}</span>
          <GroupSelectBox />
        </div>
        <Orderbook />
        <div className="orderbook-buttons">
          <ToggleFeed />
          <KillFeed />
        </div>
      </div>
    </div>
  )
}

export default App
