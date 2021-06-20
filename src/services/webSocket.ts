import { updateFeedSaga } from "../redux/actions"
import store from "../redux/store"

export const XBT: string = "PI_XBTUSD"
export const ETH: string = "PI_ETHUSD"

export default class WebSocketManager {
  static myInstance: WebSocket | null = null

  static getInstance() {
    if (WebSocketManager.myInstance !== null) {
      return WebSocketManager.myInstance
    }

    WebSocketManager.myInstance = new WebSocket(
      "wss://www.cryptofacilities.com/ws/v1"
    )

    WebSocketManager.myInstance.onopen = (event) => {
      console.log(`WebSocket connection is now Open`)

      // Get crypto from store and subscribe to the feed
      WebSocketManager.myInstance!.send(
        '{"event": "subscribe", "feed": "book_ui_1", "product_ids": ["' +
          store.getState().crypto +
          '"]}'
      )
    }

    WebSocketManager.myInstance.onmessage = (message) => {
      if (message.data.includes("feed")) {
        store.dispatch(updateFeedSaga(message.data))
      }
    }

    WebSocketManager.myInstance.onclose = (event) => {
      WebSocketManager.myInstance = null
      console.log("WebSocket is closed now.")
      // Optional implementation: reconnect automatically - keep connection alive
      if (!store.getState().killFeed) {
        WebSocketManager.getInstance()
      }
    }

    WebSocketManager.myInstance.onerror = (event) => {
      // Note: The Kill Feed trigger in saga lands here
      console.log("WebSocket error occured.")
      // Optional unsubscribe before closing WebSocket
      WebSocketManager.myInstance!.send(
        '{"event": "unsubscribe", "feed": "book_ui_1", "product_ids": ["' +
          store.getState().crypto +
          '"]}'
      )
      WebSocketManager.myInstance!.close()
      // We could try reconnecting here (but for the kill feed feature, we won't)
    }

    return WebSocketManager.myInstance
  }
}
