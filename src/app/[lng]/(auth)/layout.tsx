"use client";

import ConnectingApp from "@/components/common/ConnectingApp";
import { HookGlobals } from "@/components/common/HookGlobals";
import { EnergyRecoveryGlobal } from "@/features/tap-game/components/Energy";
import JoinTabGameDesktop from "@/features/tap-game/components/JoinTelegramDesktop";
import TabBarMiniGameApp from "@/features/tap-game/components/menu";
import { useActivePage } from "@/libs/hooks/useActivePage";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import useUserAgent from "@/libs/hooks/useUserAgent";
import { cn } from "@/utils/cn";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { LocaleTypes } from "../i18n/settings";
import { analytics } from "@/libs/firebase/app";
import { useTelegram } from "@/libs/telegram/hooks/useTelegram";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const lng = useParams()?.lng as LocaleTypes;
  const isHomePage = useActivePage("/");
  const isReferralPage = useActivePage("enter-referral");
  const { currentUser } = useGetCurrentUser();
  const isMobile = true;
  const WebApp = window?.Telegram?.WebApp;
  const isTelegram = useTelegram();
  useEffect(() => {
    if (
      currentUser &&
      !currentUser?.is_apply_ref_code &&
      !currentUser?.is_skip_ref
    ) {
      router.push(`/${lng}/enter-referral`);
    }
  }, [currentUser]);

  useEffect(() => {
    if (WebApp) {
      WebApp.expand();
    }
  }, [WebApp]);

  if (!isTelegram) {
    return (
      <div className={cn(!isHomePage && "pb-[90px]")}>
        {isMobile ? (
          <div>
            {!isReferralPage && (
              <div>
                <HookGlobals />
                <TabBarMiniGameApp />
                <EnergyRecoveryGlobal />
              </div>
            )}

            {children}
          </div>
        ) : (
          <JoinTabGameDesktop />
        )}
      </div>
    );
  }

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
