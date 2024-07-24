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
import StatsReferral from "@/features/tap-game/components/friends/StatsReferral";

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
        <div className="mx-auto h-[140px] relative w-[160px]">
            <div
                className="absolute z-10 inset-0"
                style={{
                    background: '#45887A',
                    filter: 'blur(40px)',
                    opacity: '0.2',
                }}></div>
            <NextImage
                src={"/img/tap-game/banner_referral.webp"}
                alt={"friend logo"}
                className={" mb-2 w-[160px]"}
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
       <StatsReferral/>
      </div>
      <FriendList />
      <ShareWithFriends/>
    </div>
  );
};

export default Friends;
