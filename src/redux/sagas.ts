import { all, call, put, takeLatest } from "redux-saga/effects"
import {
  AppState,
  IData,
  INIT_APP_SAGA,
  KILL_FEED_SAGA,
  TOGGLE_FEED_SAGA,
  UPDATE_FEED_SAGA,
  UPDATE_GROUP_LEVEL_SAGA,
} from "./types"
import WebSocketManager, { ETH, XBT } from "../services/webSocket"
import { AnyAction } from "redux"
import { setCrypto, setData, setGroupLevel, setKillFeed } from "./actions"
import store from "./store"

function* initAppSaga() {
  yield call(WebSocketManager.getInstance)
}

function* updateFeedSaga({ payload }: AnyAction) {
  const incomingData: IData = JSON.parse(payload)

  // Leave early if unecessary event message - keep only the feed
  if (incomingData.event) return

  // Set orderbook snapshot first
  if (incomingData.feed.includes("book_ui_1_snapshot")) {
    yield put(setData(incomingData))
    return
  }

  // Update store data while new data updates are coming in
  var data: IData = yield store.getState().data
  if (data && incomingData.feed.includes("book_ui_1")) {
    // If feed contains new bids
    if (incomingData.bids.length) {
      // Replace or add new best bid
      incomingData.bids.forEach((incomingBid: [number, number]) => {
        if (!data.bids.length) data.bids.unshift(incomingBid)
        data.bids.forEach((bid: [number, number], index: number) => {
          if (incomingBid[0] === bid[0]) {
            data.bids[index] = incomingBid
          } else if (incomingBid[0] > data.bids[0][0]) {
            data.bids.unshift(incomingBid)
          }
        })
      })

      // Remove bids of size 0 from orderbook
      data.bids.forEach((bid, index) => {
        if (bid[1] === 0) data.bids.splice(index, 1)
      })

      // Keep bids to a max depth of 25
      while (data.bids.length > 25) {
        data.bids.pop()
      }

      yield put(setData(data))
    }
    // If feed contains new asks
    if (incomingData.asks.length) {
      // Replace or add new best ask
      incomingData.asks.forEach((incomingAsk: [number, number]) => {
        if (!data.asks.length) data.asks.unshift(incomingAsk)
        data.asks.forEach((ask: [number, number], index: number) => {
          if (incomingAsk[0] === ask[0]) {
            data.asks[index] = incomingAsk
          } else if (incomingAsk[0] < data.asks[0][0]) {
            data.asks.unshift(incomingAsk)
          }
        })
      })

      // Remove asks of size 0 from orderbook
      data.asks.forEach((ask, index) => {
        if (ask[1] === 0) data.asks.splice(index, 1)
      })

      // Keep asks to a max depth of 25
      while (data.asks.length > 25) {
        data.asks.pop()
      }

      // Update data in store (creating a new object to change ref and trigger refresh of UI)
      yield put(setData(Object.create(data)))
    }
  }
}

function* updateGroupLevelSaga({ payload: groupLevel }: AnyAction) {
  yield put(setGroupLevel(groupLevel))
}

function* toggleFeedSaga({ payload: crypto }: AnyAction) {
  const state: AppState = yield store.getState()
  const groupLevel: number = yield state.groupLevel

  // Unsubscribe from current crypto
  if (WebSocketManager.myInstance !== null) {
    const ws: WebSocket = yield call(WebSocketManager.getInstance)
    yield ws.send(
      '{"event": "unsubscribe", "feed": "book_ui_1", "product_ids": ["' +
        state.crypto +
        '"]}'
    )
  }

  // Toggle crypto in store and set groupLevel associated
  yield put(setCrypto(crypto))

  // GroupLevel logic when switching crypto (and than the UI)
  switch (groupLevel) {
    case 0.5:
    case 0.05:
      if (crypto === XBT)
        yield call(updateGroupLevelSaga, {
          type: UPDATE_GROUP_LEVEL_SAGA,
          payload: 0.5,
        })
      if (crypto === ETH)
        yield call(updateGroupLevelSaga, {
          type: UPDATE_GROUP_LEVEL_SAGA,
          payload: 0.05,
        })
      break
    case 1:
    case 0.1:
      if (crypto === XBT)
        yield call(updateGroupLevelSaga, {
          type: UPDATE_GROUP_LEVEL_SAGA,
          payload: 1,
        })
      if (crypto === ETH)
        yield call(updateGroupLevelSaga, {
          type: UPDATE_GROUP_LEVEL_SAGA,
          payload: 0.1,
        })
      break
    case 2.5:
    case 0.25:
      if (crypto === XBT)
        yield call(updateGroupLevelSaga, {
          type: UPDATE_GROUP_LEVEL_SAGA,
          payload: 2.5,
        })
      if (crypto === ETH)
        yield call(updateGroupLevelSaga, {
          type: UPDATE_GROUP_LEVEL_SAGA,
          payload: 0.25,
        })
      break
  }

  // Subscribe to new current crypto
  if (WebSocketManager.myInstance !== null) {
    const ws: WebSocket = yield call(WebSocketManager.getInstance)
    yield ws.send(
      '{"event": "subscribe", "feed": "book_ui_1", "product_ids": ["' +
        crypto +
        '"]}'
    )
  }
}

function* killFeedSaga() {
  // Switch the KillFeed on/off
  yield put(setKillFeed(!store.getState().killFeed))

  if (store.getState().killFeed) {
    var ws: WebSocket = yield call(WebSocketManager.getInstance)
    // Throw an error
    yield ws.dispatchEvent(new Event("error"))
  } else {
    yield call(WebSocketManager.getInstance)
  }
}

function* rootSaga() {
  yield all([
    takeLatest(INIT_APP_SAGA, initAppSaga),
    takeLatest(UPDATE_FEED_SAGA, updateFeedSaga),
    takeLatest(UPDATE_GROUP_LEVEL_SAGA, updateGroupLevelSaga),
    takeLatest(TOGGLE_FEED_SAGA, toggleFeedSaga),
    takeLatest(KILL_FEED_SAGA, killFeedSaga),
  ])
}

export default rootSaga
