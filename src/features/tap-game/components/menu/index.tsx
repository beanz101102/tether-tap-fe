"use client";
import { useTranslation } from "@/app/[lng]/i18n/client";
import NextImage from "@/components/common/next-image";
import { useActivePage } from "@/libs/hooks/useActivePage";
import { cn } from "@/utils/cn";
import { initHapticFeedback, initWeb } from "@tma.js/sdk";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TabBarMiniGameAppProps {
  name: string;
  path: string;
  imgUrl: string;
  isActive: boolean;
  isImage?: boolean;
}

const TabBarMiniGameApp = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "menu",
  });
  const router = useRouter();
  // TODO: reopen
  // const hapticFeedback = initHapticFeedback();

  // Call hooks unconditionally
  const isHomePageActive = useActivePage("/");
  const isBoostPageActive = useActivePage("boost");
  const isRankingPageActive = useActivePage("ranking");
  const isRoadmapPageActive = useActivePage("roadmap");
  const isEarnPageActive = useActivePage("earn");
  const isFriendsPageActive = useActivePage("referral");
  const isWalletPageActive = useActivePage("wallet");
  const isMinePageActive = useActivePage("mine");

  // Determine if home page is active
  const isActiveHomePage =
    isHomePageActive ||
    isBoostPageActive ||
    isRankingPageActive ||
    isRoadmapPageActive;

  const itemTabBar: TabBarMiniGameAppProps[] = [
    {
      name: "tap",
      path: "/",
      imgUrl: "tap.svg",
      isActive: isActiveHomePage,
    },
    {
      name: "mine",
      path: "/mine",
      imgUrl: "mine.svg",
      isActive: isMinePageActive,
    },
    {
      name: "earn",
      path: "/earn",
      imgUrl: "earn.svg",
      isActive: isEarnPageActive,
    },
    {
      name: "wallet",
      path: "/wallet",
      imgUrl: "wallet.svg",
      isActive: isWalletPageActive,
    },
    {
      name: "friends",
      path: "/referral",
      imgUrl: "friend.svg",
      isActive: isFriendsPageActive,
    },
  ];

  const clickTab = () => {
    // Play vibrate
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
          "fixed bottom-0 left-1/2 z-50 flex w-full max-w-[500px] -translate-x-1/2 transform justify-evenly gap-4",
        )}
      >
        <div
          className={cn(
            "flex h-[66px] w-full justify-between rounded-[16px] backdrop-blur-[16px]",
          )}
          style={{
            background: "rgba(24, 24, 27, 1)",
          }}
        >
          {itemTabBar.map((item, index) => {
            return (
              <Link
                prefetch
                href={item.path}
                key={index}
                onClick={() => {
                  // TODO: reopen
                  // hapticFeedback.impactOccurred("heavy");
                  clickTab();
                }}
                style={{
                  background: item.isActive ? "rgba(255, 255, 255, 0.05)" : "",
                }}
                className={clsx(
                  "relative flex w-[20%] flex-col items-center justify-center gap-0.5",
                  item.isActive ? "main-text-primary" : "main-text-secondary",
                  index === 0 ? "rounded-l-[16px]" : "rounded-[16px]",
                )}
              >
                <NextImage
                  src={`/img/tap-game/${item.imgUrl}`}
                  alt={item.imgUrl}
                  className={cn("h-8 w-8 flex items-center justify-center")}
                />
                <span className={cn("mt-[2px] text-xs font-medium")}>
                  {t(item.name)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBarMiniGameApp;
