import React from "react"
import "./App.css"
import GroupSelectBox from "./components/groupSelectBox/GroupSelectBox"
import Orderbook from "./components/orderbook/Orderbook"
import ToggleFeed from "./components/toggleFeed/ToggleFeed"
import KillFeed from "./components/killFeed/KillFeed"

const App = () => {
  return (
    <div className="App">
      <div className="orderbook-container">
        <div className="orderbook-header">
          <span>Order Book</span>
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
