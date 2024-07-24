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
      imgUrl: "tap.webp",
      isActive: isActiveHomePage,
    },
    {
      name: "earn",
      path: "/earn",
      imgUrl: "coin.svg",
      isActive: isEarnPageActive,
    },
    {
      name: "friends",
      path: "/referral",
      imgUrl: "friends.webp",
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
            background: "rgba(6, 32, 24, 0.80)",
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
                  background: item.isActive ? "rgba(167, 243, 208, 0.05)" : "",
                }}
                className={clsx(
                  "relative flex w-[33%] flex-col items-center justify-center gap-0.5",
                  item.isActive ? "main-text-primary" : "main-text-secondary",
                  index === 0 ? "rounded-l-[16px]" : "rounded-[16px]",
                )}
              >
                <NextImage
                  src={`/img/tap-game/${item.imgUrl}`}
                  alt={item.imgUrl}
                  className={cn("h-8 w-8")}
                />
                <span className={cn("mt-[2px] text-sm font-normal")}>
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