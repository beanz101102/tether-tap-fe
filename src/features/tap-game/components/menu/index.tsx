"use client";
import { useTranslation } from "@/app/[lng]/i18n/client";
import NextImage from "@/components/common/next-image";
import { useActivePage } from "@/libs/hooks/useActivePage";
import { cn } from "@/utils/cn";
import { initHapticFeedback, initWeb } from "@tma.js/sdk";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Home, Hammer, Trophy, Wallet, Users } from "lucide-react";

interface TabBarMiniGameAppProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const TabBarMiniGameApp = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "menu",
  });
  const router = useRouter();
  const hapticFeedback = initHapticFeedback();

  // Call hooks unconditionally
  const isHomePageActive = useActivePage("/");
  const isBoostPageActive = useActivePage("boost");
  const isRoadmapPageActive = useActivePage("roadmap");
  const isEarnPageActive = useActivePage("earn");
  const isFriendsPageActive = useActivePage("referral");
  const isWalletPageActive = useActivePage("wallet");
  const isDepositPageActive = useActivePage("wallet/deposit");
  const isWithdrawPageActive = useActivePage("wallet/withdraw");
  const isMinePageActive = useActivePage("mine");

  // Determine if home page is active
  const isActiveHomePage = useMemo(
    () => isHomePageActive || isBoostPageActive || isRoadmapPageActive,
    [isHomePageActive, isBoostPageActive, isRoadmapPageActive],
  );

  const isActiveWalletPage = useMemo(
    () => isWalletPageActive || isWithdrawPageActive || isDepositPageActive,
    [isWalletPageActive, isDepositPageActive, isWithdrawPageActive],
  );

  const itemTabBar: TabBarMiniGameAppProps[] = [
    {
      name: "Hit",
      path: "/",
      icon: <Hammer className="h-6 w-6" />,
      isActive: isActiveHomePage,
    },
    {
      name: "Mine",
      path: "/mine",
      icon: <Home className="h-6 w-6" />,
      isActive: isMinePageActive,
    },
    {
      name: "Earn",
      path: "/earn",
      icon: <Trophy className="h-6 w-6" />,
      isActive: isEarnPageActive,
    },
    {
      name: "Friends",
      path: "/referral",
      icon: <Users className="h-6 w-6" />,
      isActive: isFriendsPageActive,
    },
    {
      name: "Wallet",
      path: "/wallet",
      icon: <Wallet className="h-6 w-6" />,
      isActive: isActiveWalletPage,
    },
  ];

  const clickTab = () => {
    if (
      "vibrate" in navigator &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      window.navigator.vibrate(10);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "fixed bottom-4 left-1/2 z-50 flex w-full max-w-[500px] -translate-x-1/2 transform justify-evenly gap-4 rounded-[16px] px-4",
        )}
      >
        <div
          className={cn(
            "flex h-[66px] w-full justify-between rounded-[16px] shadow-lg",
            "bg-white/80 backdrop-blur-[16px]",
          )}
        >
          {itemTabBar.map((item, index) => {
            const isActive = item.isActive;

            return (
              <Link
                prefetch
                href={item.path}
                key={index}
                onClick={() => {
                  hapticFeedback.impactOccurred("heavy");
                  clickTab();
                }}
                className={clsx(
                  "relative flex w-[20%] flex-col items-center justify-center gap-0.5",
                  "transition-all duration-200",
                  isActive ? "bg-blue-50/80" : "hover:bg-gray-50/80",
                  index === 0
                    ? "rounded-l-[16px]"
                    : index === itemTabBar.length - 1
                      ? "rounded-r-[16px]"
                      : "",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center",
                    isActive ? "scale-110" : "scale-100",
                    "transition-transform duration-200",
                    isActive ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "mt-[2px] text-xs font-medium",
                    isActive ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  {item.name}
                </span>

                {isActive && (
                  <div className="absolute -bottom-[2px] left-1/2 h-1 w-10 -translate-x-1/2 rounded-t-full bg-blue-500" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBarMiniGameApp;
