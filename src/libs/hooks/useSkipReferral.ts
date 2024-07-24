import { useRouter } from "next/navigation";
import { useState } from "react";
import { SocketRoutes } from "../redux/features/socketSlice";
import { useGetCurrentUser } from "./useGetCurrentUser";
import { useSendSocketRequest } from "./useSendSocketRequest";
import { useInitData } from "@tma.js/sdk-react";

export const useSkipReferral = () => {
  const initData = useInitData();
  const telegramId = initData?.user?.id ? String(initData?.user?.id) : null;
  const { setCurrentUser, currentUser } = useGetCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { trigger } = useSendSocketRequest({
    route: SocketRoutes.SkipRef,
    enable: false,
    onDone: () => {
      if (currentUser) {
        setIsLoading(false);
        setCurrentUser({
          ...currentUser,
          is_skip_ref: true,
        });
        router.push("/");
      }
    },
  });

  const handleSkipReferral = () => {
    setIsLoading(true);
    trigger({
      telegram_id: telegramId,
    });
  };

  return {
    handleSkipReferral,
    isLoading,
  };
};
