//@ts-nocheck
import { PayloadAction } from "@reduxjs/toolkit";
import { PayLoadSocketData } from "../features/socketSlice";
import {
  call,
  cancel,
  fork,
  put,
  take,
  delay,
  select,
} from "redux-saga/effects";

const DELAY_TIME = 200;

export function* sendSocketRequest(action: PayloadAction<PayLoadSocketData>) {
  // debugger;
  const nano = window?.nano;
  let responseData;
  yield put({
    type: "socket/changeLoadingState",
    payload: {
      ...action.payload,
      data: true,
    },
  });
  yield put({
    type: "socket/addSendData",
    payload: { ...action.payload, data: action.payload.data },
  });
  yield call(
    () =>
      new Promise<void>((resolve, reject) => {
        const startTime = Date.now();
        nano.request(action.payload.route, action.payload.data, (data) => {
          if (action.payload.callback) {
            action.payload.callback(data);
          }
          responseData = data; // Assigning value inside the callback

          resolve(); // Resolve the promise when callback is done
        });
      }),
  );

  if (responseData) {
    delete responseData?.requestData;
    yield put({
      type: "socket/addCallBackData",
      payload: { ...action.payload, data: responseData },
    });
  }

  yield put({
    type: "socket/changeLoadingState",
    payload: { ...action.payload, data: false },
  });
}

export function* watchSendSocketRequest() {
  yield takeLatestByRoute("SEND_SOCKET_REQUEST", sendSocketRequest, DELAY_TIME);
}

function* debounceWorker(saga, action, lastTasksMap, delayTime, ...args) {
  const { route } = action.payload;

  // Delay the saga execution
  lastTasksMap.delete(route);

  yield delay(delayTime);

  // Check if the task has been cancelled during the delay
  yield call(saga, ...args.concat(action));
}

const takeLatestByRoute = (
  patternOrChannel,
  saga,
  delayTime = DELAY_TIME,
  ...args
) =>
  fork(function*() {
    const lastTasksMap = new Map();

    while (true) {
      const action = yield take(patternOrChannel);
      const { route, data } = action.payload;
      // Cancel the last task for this route if it's still running
      if (lastTasksMap.has(route) && Boolean(!data?.noCheck)) {
        yield cancel(lastTasksMap.get(route));
        lastTasksMap.delete(route);
      }

      // Fork a new task with a debounce worker
      const task = yield fork(
        debounceWorker,
        saga,
        action,
        lastTasksMap,
        delayTime,
        ...args,
      );

      // Store the task in the map using the route as the key
      lastTasksMap.set(route, task);
    }
  });
