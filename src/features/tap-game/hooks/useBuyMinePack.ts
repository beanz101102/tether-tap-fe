import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useSendSocketRequest } from "@/libs/hooks/useSendSocketRequest";
import { SocketRoutes } from "@/libs/redux/features/socketSlice";
import {
  ListMinePackAtom,
  MinePack,
  PackType,
} from "@/features/tap-game/hooks/useGetListMinePack";
import { atom, useSetAtom } from "jotai";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { useGetCurrentBalance } from "@/features/tap-game/hooks/useGetCurrentBalance";
import dayjs from "dayjs";
import { useTranslation } from "@/app/[lng]/i18n/client";

// list of purchased packs for watching the end time of the pack to check if have any pack will expire.
export const WatchMinePackPurchasedAtom = atom<MinePack[]>([]);

export const useBuyMinePack = (cb: () => void) => {
  const { t } = useTranslation("mine");
  const { currentUser } = useGetCurrentUser();
  const { trigger, loading } = useSendSocketRequest({
    route: SocketRoutes.BuyMinePackRequest,
    enable: false,
    onDone: () => {
      handleBuyDone();
      cb();
    },
    toastMessage: t("buy_pack_success"),
  });
  const setMinePackPurchased = useSetAtom(WatchMinePackPurchasedAtom);
  const setListMinePack = useSetAtom(ListMinePackAtom);
  const score = useGetCurrentBalance();
  const packTypeRef = useRef<PackType>(
    PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND,
  );
  const packIdRef = useRef<number>(1);

  const handleUpdatePropertiesAPackAndAddToTheListPurchased = (
    pack: MinePack,
  ) => {
    const currentTime = dayjs();
    const endTime = currentTime.add(pack.duration, "second").toISOString();

    // // Add the purchased pack to the list of purchased packs
    setMinePackPurchased((prev) => {
      return [
        ...prev,
        {
          ...pack,
          endTime,
        },
      ];
    });

    // Update the pack properties
    return {
      ...pack,
      isPurchased: true,
      isActive: true,
      endTime,
    };
  };

  const handleMappingAndSortPacks = (packs: MinePack[]) => {
    const updatedPacks = packs.map((pack) => {
      if (Number(pack.id) === packIdRef.current) {
        return handleUpdatePropertiesAPackAndAddToTheListPurchased(pack);
      }
      return pack;
    });

    // Move the purchased pack to the top of the list
    return updatedPacks.sort((a, b) => {
      if (Number(a.id) === Number(packIdRef.current)) return -1;
      if (Number(b.id) === Number(packIdRef.current)) return 1;
      return 0;
    });
  };

  const handleBuyDone = useCallback(() => {
    switch (packTypeRef.current) {
      case PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND:
        setListMinePack((prev) => {
          const updatedCoinsPerSecondPacks = handleMappingAndSortPacks(
            prev.CoinsPerSecondPacks,
          );
          return {
            ...prev,
            CoinsPerSecondPacks: updatedCoinsPerSecondPacks,
          };
        });
        break;
      case PackType.MINE_PACK_FOR_EARN_COINS_PER_TAP:
        setListMinePack((prev) => {
          const updatedCoinsPerTapPacks = handleMappingAndSortPacks(
            prev.CoinsPerTapPacks,
          );
          return {
            ...prev,
            CoinsPerTapPacks: updatedCoinsPerTapPacks,
          };
        });
        break;
      default:
        break;
    }
  }, [setListMinePack]);

  const handleBuyPack = (packId: number, type: PackType, price: number) => {
    if (Number(score) < price) {
      toast.error(t("insufficient_balance_mine"));
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
