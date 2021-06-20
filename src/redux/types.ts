export const INIT_APP_SAGA = "INIT_APP_SAGA"
export const TOGGLE_FEED_SAGA = "TOGGLE_FEED_SAGA"
export const KILL_FEED_SAGA = "KILL_FEED_SAGA"
export const UPDATE_FEED_SAGA = "UPDATE_FEED_SAGA"
export const UPDATE_GROUP_LEVEL_SAGA = "UPDATE_GROUP_LEVEL_SAGA"
export const SET_DATA = "SET_DATA"
export const SET_GROUP_LEVEL = "SET_GROUP_LEVEL"
export const SET_CRYPTO = "SET_CRYPTO"
export const SET_KILL_FEED = "SET_KILL_FEED"

export interface AppState {
  data: IData | null
  groupLevel: number
  crypto: string
  killFeed: boolean
}

export interface IData {
  event?: string
  numLevels?: number
  feed: string
  bids: [number, number][]
  asks: [number, number][]
  product_id: string
}

// --- Action interfaces --- //

interface IInitAppSagaAction {
  type: typeof INIT_APP_SAGA
}
interface IToggleFeedSagaAction {
  type: typeof TOGGLE_FEED_SAGA
  payload: string
}
interface IKillFeedSagaAction {
  type: typeof KILL_FEED_SAGA
}
interface IUpdateFeedSagaAction {
  type: typeof UPDATE_FEED_SAGA
  payload: IData
}
interface IUpdateGroupLevelSagaAction {
  type: typeof UPDATE_GROUP_LEVEL_SAGA
  payload: number
}
interface ISetDataAction {
  type: typeof SET_DATA
  payload: IData
}
interface ISetGroupLevelAction {
  type: typeof SET_GROUP_LEVEL
  payload: number
}
interface ISetCryptoAction {
  type: typeof SET_CRYPTO
  payload: string
}
interface ISetKillFeedAction {
  type: typeof SET_KILL_FEED
  payload: boolean
}

export type ActionTypes =
  | IInitAppSagaAction
  | IUpdateFeedSagaAction
  | IUpdateGroupLevelSagaAction
  | ISetGroupLevelAction
  | ISetDataAction
  | IToggleFeedSagaAction
  | ISetCryptoAction
  | IKillFeedSagaAction
  | ISetKillFeedAction
