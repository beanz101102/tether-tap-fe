import {useSendSocketRequest} from "@/libs/hooks/useSendSocketRequest";
import {SocketRoutes} from "@/libs/redux/features/socketSlice";

export const useWithdraw = () => {
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.RequestWithdraw,
    enable: false,
    toastMessage: "Withdraw successfully!",
  });

  const handleWithdraw = ({amount, receiver, chain_id}: {amount: number, receiver: string, chain_id: number}) => {
    trigger({amount, receiver, chain_id, token_id: 1});
  }

  return { handleWithdraw, loading }
}
