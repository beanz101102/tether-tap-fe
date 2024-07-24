"use client";

import { Loading } from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { useInitData as useInitData2 } from "@tma.js/sdk-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useConnectSocket } from ".";
import { changeReadyState } from "../redux/features/socketSlice";

export function ProviderSocket({ children }: { children: React.ReactNode }) {
  const initData = useInitData2();
  const { connectSocket } = useConnectSocket();
  const retryConnect = useRef(0);
  const isReconnecting = useRef(false);
  const [portReady, setPortReady] = useState(false);
  const [socketIsClosed, setSocketIsClosed] = useState(0);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  let nano = window?.nano;
  if (!nano) {
    console.error("no nano on window");
  }
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  useEffect(() => {
    if (!nano) return;
    nano.on("close", () => {
      nano.disconnect();
      isReconnecting.current = false;
      setSocketIsClosed((prev) => prev + 1);
    });
  }, [nano]);

  useEffect(() => {
    if (!socketIsClosed) return;
    if (retryConnect.current < 5 && !isReconnecting.current) {
      setLoadingOverlay(true);
      setTimeout(() => {
        initSocket({ callback: () => connectSocketInternal({ init: false }) });
      }, 500);
    }
    if (retryConnect.current >= 5) {
      setShowError(true);
    }
  }, [socketIsClosed]);

  const connectSocketInternal = useCallback(
    async ({}: { init?: boolean }) => {
      console.log("Start connectSocketInternal");
      connectSocket(nano, () => {
        dispatch(changeReadyState(true));
        setSocketIsClosed(0);
        setLoadingOverlay(false);
        retryConnect.current = 0;
        isReconnecting.current = false;
        setShowError(false);
      });
    },
    [nano],
  );

  useEffect(() => {
    if (portReady) {
      connectSocketInternal({});
    } else {
      console.log("port not ready");
    }
    console.timeEnd("until_wallet_ready");
  }, [portReady]);

  const initSocket = useCallback(
    async ({ callback }: { callback?: () => Promise<void> }) => {
      if (!nano) {
        console.log("cannot connect: no nano");
        return;
      }
      console.time("start_init_socket");
      retryConnect.current += 1;
      isReconnecting.current = true;
      new Promise<void>((resolve, reject) => {
        console.log("init socket");
        nano?.init(
          {
            host: process.env.NEXT_PUBLIC_WS_URL,
            port: undefined,
            reconnect: false,
          },
          () => {
            console.log("socket connected");
            if (callback) {
              callback();
            }
            setPortReady(true);
            resolve();
          },
        );
      });
      console.time("end_init_socket");
    },
    [nano],
  );

  const tryToInitSocket = useCallback(() => {
    if (!nano || !initData) {
      if (window?.nano) {
        nano = window.nano;
      }
      console.log(
        "no nano or init data, schedule retry",
        nano,
        initData,
        window?.nano,
        window?.Telegram?.WebApp,
      );
      return setTimeout(() => {
        console.log("try to init socket");
        tryToInitSocket();
      }, 100);
    }

    initSocket({});
    return undefined;
  }, [nano, initData]);

  useEffect(() => {
    const maybeInterval = tryToInitSocket();
    return () => {
      clearTimeout(maybeInterval);
    };
  }, []);

  return (
    <div>
      {loadingOverlay && (
        <LoadingOverlay
          connectSocketInternal={connectSocketInternal}
          showErr={showError}
          initSocket={initSocket}
        />
      )}
      {children}
    </div>
  );
}

const LoadingOverlay = ({
  showErr,
  connectSocketInternal,
  initSocket,
}: {
  showErr: boolean;
  connectSocketInternal: ({
    init,
  }: {
    init?: boolean | undefined;
  }) => Promise<void>;
  initSocket: ({
    callback,
  }: {
    callback?: (() => Promise<void>) | undefined;
  }) => Promise<void>;
}) => {
  const nano = window?.nano;
  const [showReconnect, setShowReconnect] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowReconnect(true);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showErr]);

  const reconnect = () => {
    setLoadingButton(true);
    nano?.disconnect();
    setTimeout(() => {
      initSocket({
        callback: () => connectSocketInternal({}),
      });
    }, 500);
    setTimeout(() => {
      setLoadingButton(false);
    }, 5000);
  };

  return (
    <div className="main-text-primary fixed inset-0 z-50 flex flex-col items-center justify-center bg-black !bg-opacity-50">
      {/* Loading Spinner or Message */}
      {showErr ? (
        <div className="flex flex-col items-center">
          <span className="main-text-danger mt-2">Failed to reconnect</span>
        </div>
      ) : (
        <div className="main-text-white-black flex flex-col items-center">
          <Loading></Loading>
          <span className="mt-2">Reconnecting</span>
        </div>
      )}
      {showReconnect && (
        <Button
          variant={"outline"}
          onClick={reconnect}
          className="text-main-text-primary	 m-4 rounded-lg bg-black p-2"
          loading={loadingButton}
        >
          Tap to reconnect
        </Button>
      )}
    </div>
  );
};
