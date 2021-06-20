import {
  ActionTypes,
  IData,
  INIT_APP_SAGA,
  KILL_FEED_SAGA,
  SET_CRYPTO,
  SET_GROUP_LEVEL,
  SET_DATA,
  SET_KILL_FEED,
  TOGGLE_FEED_SAGA,
  UPDATE_FEED_SAGA,
  UPDATE_GROUP_LEVEL_SAGA,
} from "./types"

export function initAppSaga(): ActionTypes {
  return {
    type: INIT_APP_SAGA,
  }
}

export function toggleFeedSaga(crypto: string): ActionTypes {
  return {
    type: TOGGLE_FEED_SAGA,
    payload: crypto,
  }
}

export function killFeedSaga(): ActionTypes {
  return {
    type: KILL_FEED_SAGA,
  }
}

export function updateFeedSaga(data: IData): ActionTypes {
  return {
    type: UPDATE_FEED_SAGA,
    payload: data,
  }
}

export function updateGroupLevelSaga(groupLevel: number): ActionTypes {
  return {
    type: UPDATE_GROUP_LEVEL_SAGA,
    payload: groupLevel,
  }
}

export function setData(data: IData): ActionTypes {
  return {
    type: SET_DATA,
    payload: data,
  }
}

export function setGroupLevel(groupLevel: number): ActionTypes {
  return {
    type: SET_GROUP_LEVEL,
    payload: groupLevel,
  }
}
export function setCrypto(crypto: string): ActionTypes {
  return {
    type: SET_CRYPTO,
    payload: crypto,
  }
}
export function setKillFeed(killFeed: boolean): ActionTypes {
  return {
    type: SET_KILL_FEED,
    payload: killFeed,
  }
}
