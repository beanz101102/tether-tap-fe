import {useAtom, useSetAtom} from "jotai/index";
import {WatchMinePackPurchasedAtom} from "@/features/tap-game/hooks/useBuyMinePack";
import {useEffect} from "react";
import dayjs from "dayjs";
import {ListMinePackAtom, MinePack} from "@/features/tap-game/hooks/useGetListMinePack";

export const useWatchExpiredPacks = () => {
  const [purchasedPacks, setMinePackPurchased] = useAtom(WatchMinePackPurchasedAtom);
  const setListMinePack = useSetAtom(ListMinePackAtom);

  useEffect(() => {
    if (purchasedPacks.length === 0) return;

    const handleWatchTheListPackPurchased = setInterval(() => {
      const currentTime = dayjs();
      let updatedPurchasedPacks: MinePack[] = [];

      purchasedPacks.forEach((pack) => {
        const endTime = dayjs(pack.endTime);

        if (pack.endTime && endTime.isBefore(currentTime)) {
          setListMinePack((prev) => {
            const updatedCoinsPerSecondPacks = prev.CoinsPerSecondPacks.map(p => {
              if (p.id === pack.id) {
                return {
                  ...p,
                  isPurchased: false,
                  isActive: false,
                  endTime: null,
                };
              }
              return p;
            });

            const updatedCoinsPerTapPacks = prev.CoinsPerTapPacks.map(p => {
              if (p.id === pack.id) {
                return {
                  ...p,
                  isPurchased: false,
                  isActive: false,
                  endTime: null,
                };
              }
              return p;
            });

            // Sort the packs: active packs first, followed by non-active packs ordered by cost
            const sortedCoinsPerSecondPacks = updatedCoinsPerSecondPacks.sort((a, b) => {
              if (a.isPurchased !== b.isPurchased) {
                return a.isPurchased ? -1 : 1; // Active packs first
              }
              return a.cost - b.cost; // Then sort by cost
            });

            const sortedCoinsPerTapPacks = updatedCoinsPerTapPacks.sort((a, b) => {
              if (a.isPurchased !== b.isPurchased) {
                return a.isPurchased ? -1 : 1; // Active packs first
              }
              return a.cost - b.cost; // Then sort by cost
            });

            return {
              ...prev,
              CoinsPerSecondPacks: sortedCoinsPerSecondPacks,
              CoinsPerTapPacks: sortedCoinsPerTapPacks,
            };
          });
        } else if (pack.endTime && endTime.diff(currentTime, 'hour') <= 1) {
          updatedPurchasedPacks.push(pack);
        }
      });

      setMinePackPurchased(updatedPurchasedPacks);
    }, 1000);

    return () => clearInterval(handleWatchTheListPackPurchased);
  }, [purchasedPacks, setMinePackPurchased, setListMinePack]);
};
