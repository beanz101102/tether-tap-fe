import toast from "react-hot-toast";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { SocketRoutes, addReceivedData } from "../redux/features/socketSlice";
import { useAtom } from "jotai";
import { userTapGameInfoAtom } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import { useDispatch } from "react-redux";
import { useInitData } from "@tma.js/sdk-react";
import {useEffect, useRef, useState} from "react";
import {useAppSelector} from "@/libs/redux/hooks";
import {coinGainedWhileOfflineAtom} from "@/app/[lng]/(auth)/layout";

export const useConnectSocket = () => {
  const initData = useInitData();

  const { setCurrentUser } = useGetCurrentUser();
  const [_, setCoinGainedWhileOffline] = useAtom(
    coinGainedWhileOfflineAtom,
  );
  const [, setUserTabGameInfo] = useAtom(userTapGameInfoAtom);
  const [, setScore] = useAtom(ScoreAtom);
  const dataToConnect = JSON.parse(JSON.stringify(initData)).initData;
  const data_check_string = useGetDataCheckString(dataToConnect);
  const dispatch = useDispatch();

  const connectSocket = (nano: any, callback: () => void, retryCount = 0) => {
    if (nano) {
      const getUserTapGame = () => {
        nano.request(
          SocketRoutes.GetUserTapGameInfo,
          {
            telegram_id: String(initData?.user?.id),
          },
          (data: any) => {
            if (data?.code === 200) {
              setUserTabGameInfo({
                ...data?.data,
                coins_bonus_per_hour: data?.data?.coins_bonus_per_hour
                  ? Number(data?.data?.coins_bonus_per_hour) * 3600
                  : 0,
              });
              setScore(data?.data?.coins_balance ?? 0);
              nano.on(SocketRoutes.onUserUpdated, (data: unknown) => {
                dispatch(
                  addReceivedData({ route: SocketRoutes.onUserUpdated, data }),
                );
              });
            }
            console.log('GetUserTapGameInfo invoked');
          },
        );
      };

      nano.request(
        "SessionConnect.InitConnect",
        {
          ...dataToConnect,
          data_check_string,
        },
        (data: any) => {
          if (data?.code === 200) {
            console.log("InitConnect", data?.data);
            // Get coins bonus from last time online
            nano.request(
              SocketRoutes.GetCoinsBonusFromLastTimeOnline,
              {
                user_id: data?.data?.id,
              },
              (cb: { data: { coins_bonus_from_last_time_online: number } }) => {
                setCoinGainedWhileOffline({
                  profit: cb?.data?.coins_bonus_from_last_time_online || 0,
                  isShowUp: true,
                });
                console.log('GetCoinsBonusFromLastTimeOnline invoked');
              },
            );

            nano.request(
              SocketRoutes.PingPong,
              {
                user_id: data?.data?.id,
              },
              (data: any) => {
                console.log('ping pong invoked');
              },
            );


            getUserTapGame();
            setCurrentUser(data?.data);
          } else if (data.code === 5002) {
            nano.request(
              "UserService.Register",
              {
                ...dataToConnect,
                data_check_string,
              },
              (data: any) => {
                if (data?.code === 200) {
                  console.log("Register", data?.data);
                  setCurrentUser(data?.data);
                  getUserTapGame();
                  callback();
                }
              },
            );
          } else if (data.code !== 200) {
            const errorMsg = `SessionConnect.InitConnect: ${data.message}`;
            // Retry logic
            if (retryCount < 10) {
              nano.disconnect();
              setTimeout(() => {
                connectSocket(nano, callback, retryCount + 1);
              }, 500);
            } else {
              toast.error(
                `Cannot connect to the server. Please try reloading.`,
              );
              console.error(errorMsg);
            }
            return;
          }
          if (data.code === 200) {
            // store.dispatch(kaddSocket(nano));
            callback();
          }
        },
      );
    }
  };
  return { connectSocket };
};

//
export const useGetDataCheckString = (initData: any) => {
  return window?.Telegram?.WebApp?.initData;
  //
  // const { result: initData } = useInitDataRaw();

  // const data = {
  //   ...initData,
  //   user: JSON.stringify(initData?.user),
  // };
  //
  // const { hash, ...dataFields } = data as any;
  // const dataCheckString = Object.keys(dataFields)
  //   .sort()
  //   .map((key) => `${key}=${(dataFields as any)[key]}`)
  //   .join("\n");
  //
  // return dataCheckString;
};
