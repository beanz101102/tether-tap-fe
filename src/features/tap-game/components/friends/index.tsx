"use client";
import NextImage from "@/components/common/next-image";
import { useEffect, useState } from "react";
import AboutRewardItem from "./AboutItems";
import ShareWithFriends from "./ShareWithFriends";
import { copyToClipboardWithCommand } from "@/utils/copyToClipboardWithCommand";
import { Copy } from "lucide-react";
import { MdDone } from "react-icons/md";
import FriendList from "./FriendList";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

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
      <div className="mx-auto h-[140px] w-[240px]">
        <NextImage
          src={"/img/tap-game/banner_referral.webp"}
          alt={"friend logo"}
          className={" mb-2 w-[240px]"}
        />
      </div>

      <h3
        className={
          "main-text-primary mb-2 w-full text-center text-xl font-semibold"
        }
      >
        {t("title")}
      </h3>
      <p className={"main-text-secondary mb-8 w-full text-center text-sm"}>
        {t("description")}
      </p>

      <div className={"mb-8 px-4"}>
        <AboutRewardItem type={"normal"} />
        <AboutRewardItem type={"premium"} />
      </div>

      <div className="mb-6 flex gap-2 px-4">
        <div className="flex-1">
          <ShareWithFriends />
        </div>
        <div
          style={{
            boxShadow: "0px 3px 0px 0px #3F3F46",
          }}
          className="main-bg-secondary flex w-16 min-w-[64px] items-center justify-center rounded-md"
          onClick={() => {
            setIsCopied(true);
            copyToClipboardWithCommand(linkTelegramBot, false);
          }}
        >
          {isCopied ? (
            <MdDone className="main-text-primary h-6 w-6" />
          ) : (
            <Copy className="main-text-primary h-6 w-6" />
          )}
        </div>
      </div>

      <FriendList />
    </div>
  );
};

export default Friends;
