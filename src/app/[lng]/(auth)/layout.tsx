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
    if (timeOffline > 20 && coinGainedWhileOffline?.profit !== 0) {
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

  useEffect(() => {
    console.log('open modal', isOpenModalProfitWhileOffline,
      !coinGainedWhileOffline.isShowUp,
      coinGainedWhileOffline?.profit);
  }, [isOpenModalProfitWhileOffline, coinGainedWhileOffline.isShowUp, coinGainedWhileOffline?.profit]);

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
                      !!coinGainedWhileOffline?.profit &&
                      coinGainedWhileOffline?.profit > 0
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
