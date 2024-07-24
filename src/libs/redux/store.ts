import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import socketReducer from "./features/socketSlice";
import createSagaMiddleware from "redux-saga";

import { setupListeners } from "@reduxjs/toolkit/query";
import rootSaga from "./saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counterReducer,
    socketReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "socket/addSocket",
          "socket/addReceivedData",
          "socket/addCallBackData",
          "socket/changeLoadingState",
          "socket/addSendData",
          "SEND_SOCKET_REQUEST",
          "persist/PERSIST",
          "persist/REHYDRATE",
          "socketReducer.socket",
        ],
        ignoredActionPaths: ["socket"],
        ignoredPaths: ["socketReducer.socket"],
      },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
