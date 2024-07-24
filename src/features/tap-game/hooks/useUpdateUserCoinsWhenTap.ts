import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

interface UpdateUserCoinsWhenTapPrams {
  increasedTaps: number;
}

export const useUpdateUserCoinsWhenTap = () => {
  const { currentUser } = useGetCurrentUser();
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.UpdateUserCoinsWhenTap,
    enable: false,
  });

  const handleUpdateUserCoinsWhenTap = ({
    increasedTaps,
  }: UpdateUserCoinsWhenTapPrams) => {
    trigger({
      user_id: currentUser?.id,
      increased_taps: increasedTaps,
    });
  };

  return {
    isLoading: loading,
    handleUpdateUserCoinsWhenTap,
  };
};
