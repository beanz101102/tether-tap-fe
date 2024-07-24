/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import NextImage from "@/components/common/next-image";
import React from "react";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

const ShareWithFriends = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "friends",
  });
  const { currentUser } = useGetCurrentUser();

  const handleShareWithFriends = () => {
    const url = encodeURI(
      `https://t.me/much_pepe_bot/app?startapp=${currentUser?.ref_code}`,
    );
    const message = `🌟  ${t("share_with_friends.title")}    🌟\n\n💸 ${t("share_with_friends.desc_1")}\n🔥 ${t(
      "share_with_friends.desc_2",
    )}`;

    return `https://t.me/share/url?url=${url}&text=${encodeURI(message)}`;
  };

  return (
    <a href={handleShareWithFriends()} target={"_blank"} rel="noreferrer">
      <div
        className={
          "flex w-full cursor-pointer items-center gap-3 rounded-md bg-[#059669] px-4 py-2"
        }
        style={{
          boxShadow: "0px 3px 0px 0px #065F46",
        }}
        onClick={handleShareWithFriends}
      >
        <NextImage
          src={"/img/tap-game/referral_friends.webp"}
          alt={"referral_friends"}
          className={"h-8 w-8"}
        />
        <div className={"flex flex-col gap-1"}>
          <p className={"font-medium text-white"}>{t("share_friends")}</p>
          <p className={"text-sm text-white"}>{t("des_share_friends")}</p>
        </div>
      </div>
    </a>
  );
};

export default ShareWithFriends;
