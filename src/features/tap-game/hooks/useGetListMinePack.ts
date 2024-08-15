import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { api } from "@/trpc/react";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import {useSetAtom} from "jotai/index";
import {WatchMinePackPurchasedAtom} from "@/features/tap-game/hooks/useBuyMinePack";

export interface MinePack {
  id: number;
  name: string;
  image: string;
  cost: number;
  upgradedAmt: number;
  duration: number;
  packType: PackType;
  isPurchased: boolean;
  userPackId: number | null;
  endTime: string | null; // endTime should be a string or null
  isActive: boolean;
}

export enum PackType {
  MINE_PACK_FOR_EARN_COINS_PER_SECOND = "MINE_PACK_FOR_EARN_COINS_PER_SECOND",
  MINE_PACK_FOR_EARN_COINS_PER_TAP = "MINE_PACK_FOR_EARN_COINS_PER_TAP",
}

export interface ListMinePack {
  CoinsPerSecondPacks: MinePack[];
  CoinsPerTapPacks: MinePack[];
}

export const ListMinePackAtom = atom<ListMinePack>({
  CoinsPerSecondPacks: [],
  CoinsPerTapPacks: [],
});

export const useGetListMinePack = () => {
  const [listMinePack, setListMinePack] = useAtom(ListMinePackAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useGetCurrentUser();
  const { data, isLoading: isQueryLoading } = api.tapGame.getMinePacks.useQuery(
    { userId: Number(currentUser?.id) },
    { enabled: !!currentUser?.id },
  );
  const setMinePackPurchased = useSetAtom(WatchMinePackPurchasedAtom);

  useEffect(() => {
    if (listMinePack?.CoinsPerTapPacks?.length !== 0 || listMinePack?.CoinsPerSecondPacks?.length !== 0) return;

    if (!isQueryLoading && data) {
      const formattedData: MinePack[] = data.map((pack: MinePack) => {
        // Add the purchased pack to the list of purchased packs
        if (pack.isPurchased) {
          setMinePackPurchased((prev) => [...prev, pack]);
        }

        return {
          id: pack.id,
          name: pack.name,
          image: pack.image,
          cost: pack.cost,
          upgradedAmt: pack.packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND ? Number(pack?.upgradedAmt) * 3600 : Number(pack?.upgradedAmt),
          duration: pack.duration,
          packType: pack.packType,
          isPurchased: pack.isPurchased,
          userPackId: pack.userPackId,
          endTime: pack.endTime,
          isActive: pack.isActive,
        };
      });

      // Sort the packs by isActive or isPurchased being true
      const sortedData = formattedData.sort((a, b) => {
        if (a.isActive || a.isPurchased) return -1;
        if (b.isActive || b.isPurchased) return 1;
        return 0;
      });

      // Split the packs by type
      const perSecondPacks = sortedData.filter(
        (pack) =>
          pack.packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND,
      );
      const perTapPacks = sortedData.filter(
        (pack) => pack.packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_TAP,
      );

      setListMinePack({
        CoinsPerSecondPacks: perSecondPacks,
        CoinsPerTapPacks: perTapPacks,
      });
      setIsLoading(false);
    }
  }, [data, isQueryLoading, setListMinePack]);

  return {
    listMinePack,
    isLoading: isLoading || isQueryLoading,
  };
};
