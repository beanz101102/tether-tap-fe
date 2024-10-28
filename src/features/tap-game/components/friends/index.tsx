"use client";
import { useTranslation } from "@/app/[lng]/i18n/client";
import NextImage from "@/components/common/next-image";
import StatsReferral from "@/features/tap-game/components/friends/StatsReferral";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useEffect, useState } from "react";
import FriendList from "./FriendList";
import ShareWithFriends from "./ShareWithFriends";

const Friends = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "friends",
  });
  const [isCopied, setIsCopied] = useState(false);
  const { currentUser } = useGetCurrentUser();
  const linkTelegramBot = `https://t.me/much_pepe_bot/app?startapp=${currentUser?.ref_code}`;

  useEffect(() => {
    if (!isCopied) return;
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  return (
    <div className={"relative w-full py-6"}>
      <div className="relative mx-auto h-[180px] w-[180px]">
        <NextImage
          src={"/img/invite.webp"}
          alt={"friend logo"}
          className={" z-10 mb-2 w-[180px]"}
        />
      </div>

      <h3
        className={
          "main-text-primary mb-2 w-full text-center text-xl font-semibold"
        }
      >
        {t("rewards.normal_title")}
      </h3>
      <p className={"main-text-secondary mb-8 w-full text-center text-sm"}>
        {t("description")}
      </p>

      <div className={"mb-8 px-4"}>
        <StatsReferral />
      </div>
      <FriendList />
      <ShareWithFriends />
    </div>
  );
};

export default Friends;
