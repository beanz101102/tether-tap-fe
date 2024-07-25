import { useTranslation } from "@/app/[lng]/i18n/client";
import { IUser, useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { useInitData } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useHandleEnterReferralCode = () => {
  const { t } = useTranslation("tap-game");
  const router = useRouter();
  const initData = useInitData();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser } = useGetCurrentUser();
  const isTelegramPremium = initData
    ? (initData?.user as any)?.is_premium
    : false;

  const { trigger } = useSendSocketRequest({
    route: SocketRoutes.ApplyRefCode,
    enable: false,
    callback: () => {
      setIsLoading(false);
    },
    toastMessage: t("success-enter-referral-code"),
    onDone: () => {
      if (currentUser) {
        setCurrentUser({
          ...(currentUser as IUser),
          is_apply_ref_code: true,
        });
        router?.push("/");
      }
    },
  });

  const handleEnterReferralCode = (code: string) => {
    setIsLoading(true);
    trigger({ ref_code: code, is_premium_account: isTelegramPremium });
  };

  return { handleEnterReferralCode, isLoading };
};
