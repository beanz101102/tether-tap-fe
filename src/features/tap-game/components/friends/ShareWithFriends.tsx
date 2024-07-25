/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useTranslation } from "@/app/[lng]/i18n/client";
import ShadModal from "@/components/ui/ShadModal";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useModal } from "@/libs/hooks/useModal";
import { copyToClipboardWithCommand } from "@/utils/copyToClipboardWithCommand";

const ShareWithFriends = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "friends",
  });
  const { currentUser } = useGetCurrentUser();
  const { open, setOpen, openModal } = useModal();
  const linkRefer = `https://t.me/much_pepe_bot/app?startapp=${currentUser?.ref_code}`;

  const handleShareWithFriends = () => {
    const url = encodeURI(linkRefer);
    const message = `🌟  ${t("share_with_friends.title")}    🌟\n\n💸 ${t("share_with_friends.desc_1")}\n🔥 ${t(
      "share_with_friends.desc_2",
    )}`;

    window.open(`https://t.me/share/url?url=${url}&text=${encodeURI(message)}`);
  };

  return (
    <div>
      <div
        className={
          "fixed bottom-[100px] left-1/2 z-50 flex w-full max-w-[500px] -translate-x-1/2 transform justify-evenly gap-4 px-4"
        }
      >
        <Button onClick={openModal}>{t("rewards.normal_title")}</Button>
      </div>

      <ShadModal isOpen={open} onOpen={setOpen}>
        <div className={"pb-10 pt-4"}>
          <p className={"main-text-primary text-center text-2xl font-semibold"}>
            {t("invite_friend")}
          </p>
          <p
            className={
              "main-text-secondary mt-2 text-center text-sm font-normal"
            }
          >
            {t("des_invite_friend")}
          </p>
          <Button
            className={"my-5"}
            onClick={() => {
              copyToClipboardWithCommand(linkRefer);
            }}
          >
            {t("copy_link")}
          </Button>
          <Button onClick={handleShareWithFriends}>{t("share_link")}</Button>
        </div>
      </ShadModal>
    </div>
    // <a href={handleShareWithFriends()} target={"_blank"} rel="noreferrer">
    //   <div
    //     className={
    //       "flex w-full cursor-pointer items-center gap-3 rounded-md bg-[#059669] px-4 py-2"
    //     }
    //     style={{
    //       boxShadow: "0px 3px 0px 0px #065F46",
    //     }}
    //     onClick={handleShareWithFriends}
    //   >
    //     <NextImage
    //       src={"/img/tap-game/referral_friends.webp"}
    //       alt={"referral_friends"}
    //       className={"h-8 w-8"}
    //     />
    //     <div className={"flex flex-col gap-1"}>
    //       <p className={"font-medium text-white"}>{t("share_friends")}</p>
    //       <p className={"text-sm text-white"}>{t("des_share_friends")}</p>
    //     </div>
    //   </div>
    // </a>
  );
};

export default ShareWithFriends;
