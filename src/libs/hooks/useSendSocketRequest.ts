import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RouteData, SocketRoutes } from "@/libs/redux/features/socketSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useGetDataReduxByRouter } from "@/libs/hooks/useGetDataReduxByRouter";

interface ISocketResponse {
  code: number;
  message: string;
  success?: boolean;
  error_meta?: {
    Code: number;
    Message: string;
  };
}

interface IuseSocketSendRequest<TInputData, TCallbackData> {
  route: SocketRoutes;
  callback?: (data: TCallbackData & ISocketResponse) => void;
  data?: TInputData;
  enable?: boolean;
  toastMessage?: string;
  isValidate?: boolean;
  onDone?: () => void;
  onError?: () => void;
  isGetFromCache?: boolean;
  watch?: boolean;
  queryInterval?: number;
  noCheck?: boolean;
  noCheckSendData?: boolean;
}

export function useSendSocketRequest<TInputData = any, TCallbackData = any>(
  props: IuseSocketSendRequest<TInputData, TCallbackData>,
) {
  const {
    route,
    callback,
    data,
    enable = true,
    toastMessage,
    isValidate = false,
    onDone,
    isGetFromCache = true,
    watch = false,
    queryInterval = 15000,
    noCheck = false,
    noCheckSendData = false,
    onError,
  } = props;
  const dispatch = useAppDispatch();
  const value = useGetDataReduxByRouter(route);
  const isReady = useAppSelector((state) => state.socketReducer?.isReady);

  const [loadingState, setLoadingState] = useState(false);
  const [state, setState] = useState<TCallbackData | null>(null);
  const [firstLoading, setFirstLoading] = useState(true);
  const [haveTriggerBerforeSKReady, setHaveTriggerBerforeSKReady] =
    useState(false);
  const [triggerData, setTriggerData] = useState<TInputData | undefined>(
    undefined,
  );

  const trigger = (triggerData?: TInputData) => {
    if (!isReady) {
      setTriggerData(triggerData);
      setHaveTriggerBerforeSKReady(true);
      setLoadingState(true);
      return;
    }
    setHaveTriggerBerforeSKReady(false);
    dispatch({
      type: "SEND_SOCKET_REQUEST",
      payload: {
        isOnlyLocal: !isGetFromCache,
        route: route,
        data: triggerData ? triggerData : data,
        callback: (dataCallback: TCallbackData & ISocketResponse) => {
          setLoadingState(false);
          !isGetFromCache && setState(dataCallback);
          callback && callback(dataCallback);

          if (dataCallback?.code === 200) {
            onDone && onDone();
            toastMessage && !enable && toast.success(toastMessage);
          } else {
            onError && onError();
            !enable &&
              (toastMessage || isValidate) &&
              toast.error(dataCallback?.message);
          }
        },
        noCheck: noCheck,
      },
    });
  };

  useEffect(() => {
    if (isReady && haveTriggerBerforeSKReady) {
      trigger(triggerData);
    }
  }, [isReady, haveTriggerBerforeSKReady, triggerData]);

  useEffect(() => {
    if (!isReady) return;
    if (enable && (noCheckSendData || !isEqual(data, value?.sendData))) {
      trigger();
    }
    if (watch) {
      if (isEqual(data, value?.sendData)) trigger(); // when enter the screen with data already have make sure it call immediately
      const intervalId = setInterval(() => {
        trigger();
      }, queryInterval);

      return () => clearInterval(intervalId);
    }
  }, [data, isReady, enable, value?.sendData, watch]);

  useEffect(() => {
    if (!value?.loading) {
      setFirstLoading(false);
    }
  }, [value?.loading]);

  return {
    loading: enable ? value?.loading : loadingState,
    receivedData: value?.receivedData,
    callBackData: isGetFromCache
      ? (value?.callBackData as TCallbackData | null)
      : state,
    sendData: value?.sendData,
    trigger,
    firstLoading,
  };
}
