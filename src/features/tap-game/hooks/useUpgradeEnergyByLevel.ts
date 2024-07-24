import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { useTranslation } from "react-i18next";

export const useUpgradeEnergyByLevel = (onDone: () => void) => {
  const { currentUser } = useGetCurrentUser();
  const { t } = useTranslation("tap-game", {
    keyPrefix: "upgrade",
  });
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.UpgradeEnergyByLevel,
    enable: false,
    onDone: () => {
      onDone();
    },
    toastMessage: t("upgrade_success"),
  });
  const handleUpgradeEnergyByLevel = (upgradedLevel: number) => {
    trigger({
      upgraded_level: upgradedLevel,
      user_id: currentUser?.id,
    });
  };

  return {
    handleUpgradeEnergyByLevel,
    isLoading: loading,
  };
};
