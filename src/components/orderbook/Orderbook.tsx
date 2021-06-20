import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducers"
import "./Orderbook.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useMediaQuery } from "./hooks"
import { levelBids, levelAsks } from "./dataHelper"

const Orderbook = () => {
  const data = useSelector((state: RootState) => state.data)
  const groupLevel = useSelector((state: RootState) => state.groupLevel)
  const buyColoredBarsDirection = useMediaQuery("(max-width: 768px)")
    ? "to left"
    : "to right"

  // While data is null display loading
  if (data === null) {
    return (
      <div className="Orderbook">
        <AiOutlineLoading3Quarters />
      </div>
    )
  }

  const dataBids = levelBids(groupLevel, [...data.bids])
  const dataAsks = levelAsks(groupLevel, [...data.asks])

  // Set the totals for Bids and Asks
  let currentTotalBids = 0
  let currentTotalAsks = 0

  let totalBids = 0
  dataBids.map((bid) => {
    return (totalBids += bid[1])
  })
  let totalAsks = 0
  dataAsks.map((ask) => {
    return (totalAsks += ask[1])
  })

  return (
    <div className="Orderbook">
      <table id="buy-orderbook">
        <thead>
          <tr>
            <th>PRICE</th>
            <th>SIZE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {dataBids.map((bid) => {
            currentTotalBids += bid[1]
            const percentTotal = (currentTotalBids / totalBids) * 100
            return (
              <tr
                key={bid[0]}
                style={{
                  backgroundImage: `linear-gradient(${buyColoredBarsDirection}, #0f3637 ${percentTotal}%, transparent ${percentTotal}%)`,
                }}
              >
                <td className="bid-price">
                  {bid[0].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{bid[1].toLocaleString()}</td>
                <td>{currentTotalBids.toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <table id="sell-orderbook">
        <thead>
          <tr>
            <th>TOTAL</th>
            <th>SIZE</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {dataAsks.map((ask) => {
            currentTotalAsks += ask[1]
            const percentTotal = (currentTotalAsks / totalAsks) * 100
            return (
              <tr
                key={ask[0]}
                style={{
                  backgroundImage: `linear-gradient(to left, #3e212c ${percentTotal}%, transparent ${percentTotal}%)`,
                }}
              >
                <td>{currentTotalAsks.toLocaleString()}</td>
                <td>{ask[1].toLocaleString()}</td>
                <td className="ask-price">
                  {ask[0].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Orderbook
