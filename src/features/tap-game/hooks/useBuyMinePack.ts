import {useGetCurrentUser} from "@/libs/hooks/useGetCurrentUser";
import {useSendSocketRequest} from "@/libs/hooks/useSendSocketRequest";
import {SocketRoutes} from "@/libs/redux/features/socketSlice";

export const useBuyMinePack = () => {
  const { currentUser } = useGetCurrentUser();
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.BuyMinePackRequest,
    enable: false,
  });

  const handleBuyPack = (packId: number) => {
    trigger({
      user_id: currentUser?.id,
      mine_pack_id: packId,
    });
  }

  return {
    handleBuyPack,
    loading
  }
}