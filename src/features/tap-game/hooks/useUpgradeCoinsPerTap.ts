import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { useTranslation } from "react-i18next";

export const useUpgradeCoinsPerTap = (onDone: () => void) => {
  const { currentUser } = useGetCurrentUser();
  const { t } = useTranslation("tap-game", {
    keyPrefix: "upgrade",
  });
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.UpgradeCoinsPerTap,
    enable: false,
    onDone: () => {
      onDone();
    },
    toastMessage: t("upgrade_success"),
  });
  const handleUpgradeCoinsPerTap = (upgradedLevel: number) => {
    trigger({
      user_id: currentUser?.id,
      upgraded_level: upgradedLevel,
    });
  };

  return {
    handleUpgradeCoinsPerTap,
    isLoading: loading,
  };
};
