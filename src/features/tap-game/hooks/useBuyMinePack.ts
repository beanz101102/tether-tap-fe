import {useGetCurrentUser} from "@/libs/hooks/useGetCurrentUser";
import {useSendSocketRequest} from "@/libs/hooks/useSendSocketRequest";
import {SocketRoutes} from "@/libs/redux/features/socketSlice";
import {ListMinePackAtom, PackType,} from "@/features/tap-game/hooks/useGetListMinePack";
import {useSetAtom} from "jotai";
import {useCallback, useRef} from "react";
import {toast} from "react-toastify";
import {useGetCurrentBalance} from "@/features/tap-game/hooks/useGetCurrentBalance";

export const useBuyMinePack = (cb: () => void) => {
  const packTypeRef = useRef<PackType>(
    PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND,
  );
  const packIdRef = useRef<number>(1);
  const score = useGetCurrentBalance();
  const { currentUser } = useGetCurrentUser();
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.BuyMinePackRequest,
    enable: false,
    onDone: () => {
      handleBuyDone();
      cb();
    },
    toastMessage: "Buy pack successfully!",
  });
  const setListMinePack = useSetAtom(ListMinePackAtom);

  const handleBuyDone = useCallback(() => {
    switch (packTypeRef.current) {
      case PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND:
        setListMinePack((prev) => {
          const updatedPacks = prev.CoinsPerSecondPacks.map((pack) => {
            if (Number(pack.id) === packIdRef.current) {
              return {
                ...pack,
                isPurchased: true,
                isActive: true,
              };
            }
            return pack;
          });

          // Move the purchased pack to the top of the list
          const sortedPacks = updatedPacks.sort((a, b) => {
            if (a.id === packIdRef.current) return -1;
            if (b.id === packIdRef.current) return 1;
            return 0;
          });

          return {
            ...prev,
            CoinsPerSecondPacks: sortedPacks,
          };
        });
        break;
      case PackType.MINE_PACK_FOR_EARN_COINS_PER_TAP:
        setListMinePack((prev) => {
          const updatedPacks = prev.CoinsPerTapPacks.map((pack) => {
            if (Number(pack.id) === packIdRef.current) {
              return {
                ...pack,
                isPurchased: true,
                isActive: true,
              };
            }
            return pack;
          });

          // Move the purchased pack to the top of the list
          const sortedPacks = updatedPacks.sort((a, b) => {
            if (a.id === packIdRef.current) return -1;
            if (b.id === packIdRef.current) return 1;
            return 0;
          });

          return {
            ...prev,
            CoinsPerTapPacks: sortedPacks,
          };
        });
        break;
      default:
        break;
    }
  }, []);

  const handleBuyPack = (packId: number, type: PackType, price: number) => {
    if (Number(score) < price) {
      toast("Not enough coins to buy this pack!");
      return;
    }
    const packIdNumber = Number(packId);
    packTypeRef.current = type;
    packIdRef.current = packIdNumber;
    trigger({
      user_id: currentUser?.id,
      mine_pack_id: packIdNumber,
    });
  };

  return {
    handleBuyPack,
    loading,
  };
};
