"use client";

import { useAppSelector } from "@/libs/redux/hooks";
import { RouteData, SocketRoutes } from "@/libs/redux/features/socketSlice";

export const useGetDataReduxByRouter = (route: SocketRoutes) => {
  const value = useAppSelector(
    (state) => state?.socketReducer?.routes?.[route],
  ) as RouteData;
  return {
    receivedData: value?.receivedData,
    sendData: value?.sendData,
    loading: value?.loading,
    callBackData: value?.callBackData,
  };
};
