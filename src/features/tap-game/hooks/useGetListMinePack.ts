import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { api } from "@/trpc/react";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";

export interface MinePack {
  id: number;
  name: string;
  image: string;
  cost: string;
  upgradedAmt: string;
  duration: number;
  packType: PackType;
  isPurchased: boolean;
  userPackId: number | null;
  endTime: string | null;
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

  useEffect(() => {
    if (!isQueryLoading && data) {
      const formattedData: MinePack[] = data.map((pack: MinePack) => ({
        id: pack.id,
        name: pack.name,
        image: pack.image,
        cost: pack.cost,
        upgradedAmt: pack.upgradedAmt,
        duration: pack.duration,
        packType: pack.packType,
        isPurchased: pack.isPurchased,
        userPackId: pack.userPackId,
        endTime: pack.endTime,
        isActive: pack.isActive,
      }));

      // Split the packs by type
      const perSecondPacks = formattedData.filter(
        (pack) =>
          pack.packType === PackType.MINE_PACK_FOR_EARN_COINS_PER_SECOND,
      );
      const perTapPacks = formattedData.filter(
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
