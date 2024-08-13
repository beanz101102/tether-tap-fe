import {useSendSocketRequest} from "@/libs/hooks/useSendSocketRequest";
import {SocketRoutes} from "@/libs/redux/features/socketSlice";
import {useGetCurrentUser} from "@/libs/hooks/useGetCurrentUser";
import {useGetTokenInfo} from "@/features/tap-game/hooks/useGetTokenInfo";
import {useAtomValue, useSetAtom} from "jotai/index";
import {ChainIdAtom} from "@/features/tap-game/components/wallet/SelectChain";
import {toast} from "react-toastify";

export const useWithdraw = (onDone: () => void) => {
  const {currentUser} = useGetCurrentUser()
  const {tokensInfo} = useGetTokenInfo()
  const chainID = useAtomValue(ChainIdAtom);

  const tokenID = tokensInfo?.find((e) =>  e?.token_name === "Tether" && e?.chain_id === chainID)?.id

  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.RequestWithdraw,
    enable: false,
    toastMessage: "Withdraw successfully!",
    onDone: () => {
      onDone()
    }
  });

  const handleWithdraw = ({amount, receiver, chain_id}: {amount: number, receiver: string, chain_id: number}) => {
    if(!tokenID){
      toast.success("TokenID not found")
      return
    }
    trigger({amount, receiver, chain_id, token_id: tokenID, user_id: currentUser?.id});
  }

  return { handleWithdraw, loading }
}
