import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SocketRoutes {
  onUserUpdated = "onUserUpdated",
  UserInfo = "UserService.GetUserInfo",
  ApplyRefCode = "UserService.ApplyRefCode",
  RequestWithdraw = "UserService.RequestWithdraw",
  // Start tap game
  PingPong = "TapGameService.Ping",
  GetUserTapGameInfo = "TapGameService.GetUserTapGameInfoWithTelegram",
  UpdateUserCoinsWhenTap = "TapGameService.UpdateUserCoinsWhenTap",
  BuyMinePackRequest = "TapGameService.BuyMinePack",
  UpgradeEnergyByLevel = "TapGameService.UpgradeEnergyByLevel",
  UpgradeCoinsPerTap = "TapGameService.UpgradeCoinsPerTap",
  CheckUserSpecificActionStatus = "TapGameService.CheckUserSpecificActionStatus",
ResetCurrentEnergy = "TapGameService.ResetCurrentEnergy",
  CheckCondition = "CheckCondition",
  ClaimQuest = "TapGameService.ClaimQuest",
  SkipRef = "UserService.SkipRef",
  GetTokensInfo = "TapGameService.GetTokensInfo"
  // End tap game
}

export interface RouteData {
  receivedData: any;
  sendData: any;
  loading: boolean;
  callBackData: any;
}

export interface PayLoadSocketData {
  route: SocketRoutes;
  isReady?: boolean;
  data: any;
  callback?: (data: any) => void;
  isOnlyLocal?: boolean;
}

const createSocketRoutes = (): { [key in SocketRoutes]: RouteData } => {
  const socketRoutes: { [key in SocketRoutes]: RouteData } = {} as any;
  Object.values(SocketRoutes).forEach((route) => {
    socketRoutes[route] = {
      receivedData: null,
      sendData: null, // Add the missing 'sendData' property
      loading: true,
      callBackData: null,
    };
  });
  return socketRoutes;
};

export const socket = createSlice({
  name: "socket",
  initialState: {
    socket: typeof window != "undefined" ? window.nano : null,
    isReady: false,
    routes: createSocketRoutes(),
  },
  reducers: {
    addSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    addReceivedData: (state, action: PayloadAction<PayLoadSocketData>) => {
      state.routes[action.payload.route].receivedData = action.payload.data;
    },
    addCallBackData: (state, action: PayloadAction<PayLoadSocketData>) => {
      if (!action?.payload?.isOnlyLocal) {
        state.routes[action.payload.route].callBackData = action.payload.data;
      }
    },
    changeLoadingState: (state, action: PayloadAction<PayLoadSocketData>) => {
      state.routes[action.payload.route].loading = action.payload.data;
    },
    addSendData: (state, action: PayloadAction<PayLoadSocketData>) => {
      state.routes[action.payload.route].sendData = action.payload.data;
    },
    changeReadyState: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
  },
});

export const {
  addSocket,
  addReceivedData,
  addCallBackData,
  changeLoadingState,
  addSendData,
  changeReadyState,
} = socket.actions;
export default socket.reducer;
