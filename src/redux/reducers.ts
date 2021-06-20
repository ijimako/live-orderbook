import {
  // SET_DATA,
  AppState,
  ActionTypes,
  SET_CRYPTO,
  SET_KILL_FEED,
  SET_GROUP_LEVEL,
  SET_DATA,
} from "./types"

export const initialState: AppState = {
  data: null,
  groupLevel: 0.5,
  crypto: "PI_XBTUSD",
  killFeed: false,
}

const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case SET_GROUP_LEVEL:
      return {
        ...state,
        groupLevel: action.payload,
      }
    case SET_CRYPTO:
      return {
        ...state,
        crypto: action.payload,
      }
    case SET_KILL_FEED:
      return {
        ...state,
        killFeed: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
