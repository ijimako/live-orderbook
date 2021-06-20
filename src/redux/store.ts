import { composeWithDevTools } from "redux-devtools-extension"
import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer, { initialState } from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  initialState,
  // applyMiddleware(sagaMiddleware),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
