import {useSendSocketRequest} from "@/libs/hooks/useSendSocketRequest";
import {SocketRoutes} from "@/libs/redux/features/socketSlice";
import {useGetCurrentUser} from "@/libs/hooks/useGetCurrentUser";

export const useWithdraw = () => {
  const {currentUser} = useGetCurrentUser()
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.RequestWithdraw,
    enable: false,
    toastMessage: "Withdraw successfully!",
  });

  const handleWithdraw = ({amount, receiver, chain_id}: {amount: number, receiver: string, chain_id: number}) => {
    trigger({amount, receiver, chain_id, token_id: 1, user_id: currentUser?.id});
  }

  return { handleWithdraw, loading }
}
