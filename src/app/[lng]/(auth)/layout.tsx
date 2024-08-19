"use client";

import ConnectingApp from "@/components/common/ConnectingApp";
import { HookGlobals } from "@/components/common/HookGlobals";
import { EnergyRecoveryGlobal } from "@/features/tap-game/components/Energy";
import JoinTabGameDesktop from "@/features/tap-game/components/JoinTelegramDesktop";
import TabBarMiniGameApp from "@/features/tap-game/components/menu";
import { useActivePage } from "@/libs/hooks/useActivePage";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { cn } from "@/utils/cn";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LocaleTypes } from "../i18n/settings";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import ModalTotalEarnedWhileOffline from "@/features/tap-game/components/earn/TotalEarnedWhileOffline";
import { atom, useAtom } from "jotai";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";

export interface ICoinGainedWhileOfflineAtom {
  profit: number;
  isShowUp: boolean;
}
export const coinGainedWhileOfflineAtom = atom<ICoinGainedWhileOfflineAtom>({
  profit: 0,
  isShowUp: false,
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenModalProfitWhileOffline, setOpenModalProfitWhileOffline] =
    useState(true);
  const [coinGainedWhileOffline, setCoinGainedWhileOffline] = useAtom(
    coinGainedWhileOfflineAtom,
  );
  const { userTapGameInfo, isLoading } = useGetUserTapGameInfo();
  const router = useRouter();
  const lng = useParams()?.lng as LocaleTypes;
  const isHomePage = useActivePage("/");
  const isReferralPage = useActivePage("enter-referral");
  const { currentUser } = useGetCurrentUser();
  const isMobile = true;
  const WebApp = window?.Telegram?.WebApp;
  const isReadyToCallPingPongRef = useRef<boolean>(false);
  useEffect(() => {
    if (
      currentUser &&
      !currentUser?.is_apply_ref_code &&
      !currentUser?.is_skip_ref
    ) {
      router.push(`/${lng}/enter-referral`);
    }
  }, [currentUser]);

  const { trigger } = useSendSocketRequest({
    route: SocketRoutes.PingPong,
    enable: false,
  });

  const { trigger: getCoinGainedWhileOffline } = useSendSocketRequest({
    route: SocketRoutes.GetCoinsBonusFromLastTimeOnline,
    callback: (cb) => {
      console.log("cb_getCoinsBonusFromLastTimeOnline", cb);
    },
    enable: false,
    onDone: (cb: { data: { coins_bonus_from_last_time_online: number } }) => {
      isReadyToCallPingPongRef.current = true;
      setCoinGainedWhileOffline({
        profit: cb?.data?.coins_bonus_from_last_time_online
          ? Number(
              Number(cb?.data?.coins_bonus_from_last_time_online).toFixed(8),
            )
          : 0,
        isShowUp: true,
      });
    },
  });

  useEffect(() => {
    if (!currentUser || !userTapGameInfo || isLoading) return;

    let retryCount = 0; // Initialize retry count
    const maxRetryCount = 10; // Maximum retry count

    const attemptGetCoinGainedWhileOffline = () => {
      getCoinGainedWhileOffline({
        user_id: currentUser?.id,
      });

      retryCount++; // Increment the retry count

      if (retryCount > maxRetryCount) {
        isReadyToCallPingPongRef.current = true; // Stop retrying after maxRetryCount attempts
      } else if (!isReadyToCallPingPongRef.current) {
        setTimeout(attemptGetCoinGainedWhileOffline, 3000); // Retry after 3 seconds
      }
    };

    attemptGetCoinGainedWhileOffline(); // Initial call
  }, [currentUser, userTapGameInfo, isLoading]);

  useEffect(() => {
    console.log(
      "userTapGameInfo?.coins_bonus_per_hour",
      userTapGameInfo?.coins_bonus_per_hour,
      "coinGainedWhileOffline?.profit",
      coinGainedWhileOffline?.profit,
    );
    if (
      !userTapGameInfo?.coins_bonus_per_hour ||
      !coinGainedWhileOffline?.profit
    )
      return;
    const profitPerSecond = userTapGameInfo?.coins_bonus_per_hour / 3600;
    const profitGainedWhileOffline = coinGainedWhileOffline?.profit;
    const timeOffline = profitGainedWhileOffline / profitPerSecond;
    console.log(
      "timeOffline",
      timeOffline,
      profitGainedWhileOffline,
      profitPerSecond,
    );
    if (timeOffline > 1) {
      setCoinGainedWhileOffline((prev) => {
        return {
          ...prev,
          isShowUp: false,
        };
      });
    }
  }, [userTapGameInfo?.coins_bonus_per_hour, coinGainedWhileOffline?.profit]);

  useEffect(() => {
    if (!currentUser) return;

    setInterval(() => {
      if (!isReadyToCallPingPongRef.current) return;
      trigger({
        user_id: currentUser?.id,
      });
    }, 5000);
  }, [currentUser]);

  useEffect(() => {
    if (WebApp) {
      WebApp.expand();
    }
  }, [WebApp]);

  return (
    <div>
      {!currentUser ||
      (!currentUser?.is_skip_ref &&
        !currentUser?.is_apply_ref_code &&
        !isReferralPage) ? (
        <ConnectingApp />
      ) : (
        <div className={cn(!isHomePage && "pb-[90px]")}>
          {isMobile ? (
            <div>
              {!isReferralPage && (
                <div>
                  <HookGlobals />
                  <TabBarMiniGameApp />
                  <EnergyRecoveryGlobal />
                  <ModalTotalEarnedWhileOffline
                    isOpen={
                      isOpenModalProfitWhileOffline &&
                      !coinGainedWhileOffline.isShowUp &&
                      !!coinGainedWhileOffline?.profit
                    }
                    setOpen={setOpenModalProfitWhileOffline}
                    profit={coinGainedWhileOffline.profit}
                  />
                </div>
              )}

              {children}
            </div>
          ) : (
            <JoinTabGameDesktop />
          )}
        </div>
      )}
    </div>
  );
}
