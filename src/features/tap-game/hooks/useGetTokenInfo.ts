import {useSendSocketRequest} from "@/libs/hooks/useSendSocketRequest";
import {SocketRoutes} from "@/libs/redux/features/socketSlice";
import {atom, useAtom} from "jotai";
import {useEffect} from "react";

interface TokenData {
  chain_id: number;
  chain_link_price_feed: string;
  decimals: number;
  id: number;
  logo: string;
  symbol: string;
  token_address: string;
  token_name: string;
}

export const TokensInfoAtom = atom<TokenData[]>([]);
export const useGetTokenInfo = () => {
  const [tokensInfo, setTokensInfo] = useAtom(TokensInfoAtom);
  const { trigger, loading, callBackData } = useSendSocketRequest({
    route: SocketRoutes.GetTokensInfo,
    enable: false,
  });

  useEffect(() => {
    if (tokensInfo?.length !== 0) return;
    trigger();
  }, [tokensInfo?.length]);

  useEffect(() => {
    if (loading || tokensInfo?.length !== 0 || !callBackData) return;

    setTokensInfo(callBackData?.data);
  }, [callBackData?.data]);

  return { tokensInfo, loading };
}