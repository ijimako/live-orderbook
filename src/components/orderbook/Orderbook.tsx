import React from "react"
import "./Orderbook.css"

const Orderbook = () => {
  return (
    <div className="Orderbook">
      <table className="buy-orderbook">
        <thead>
          <tr>
            <th>Price</th>
            <th>Size</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Each new tr is a new line and should match a line in the response API */}
          <tr>{/* Create a map */}</tr>
          <tr>{/* Create a map */}</tr>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>BUY</td>
          </tr>
        </tbody>
      </table>
      <table className="sell-orderbook">
        <thead>
          <tr>
            <th>Total</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Each new tr is a new line and should match a line in the response API */}
          <tr>{/* Create a map */}</tr>
          <tr>{/* Create a map */}</tr>
          <tr>
            <td>SELL</td>
            <td>Doe</td>
            <td>John</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Orderbook
