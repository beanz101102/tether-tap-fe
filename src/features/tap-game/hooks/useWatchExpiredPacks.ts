import {useAtom, useSetAtom} from "jotai";
import {WatchMinePackPurchasedAtom} from "@/features/tap-game/hooks/useBuyMinePack";
import {ListMinePackAtom, MinePack} from "@/features/tap-game/hooks/useGetListMinePack";
import {useEffect} from "react";
import dayjs from "dayjs";

export const useWatchExpiredPacks = () => {
  const [purchasedPacks, setMinePackPurchased] = useAtom(WatchMinePackPurchasedAtom);
  const setListMinePack = useSetAtom(ListMinePackAtom);

  useEffect(() => {
    if (purchasedPacks.length === 0) return;
    // Watch the list of purchased packs to check if any pack has expired, and update the list accordingly
    // Only watch the pack that has the end time less than 1 hour
    const handleWatchTheListPackPurchased = setInterval(() => {
      const currentTime = dayjs();
      let updatedPurchasedPacks: MinePack[] = [];

      purchasedPacks.forEach((pack) => {
        const endTime = dayjs(pack.endTime);

        if (pack.endTime && endTime.isBefore(currentTime)) {
          // If the pack has expired, update its properties
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

            return {
              ...prev,
              CoinsPerSecondPacks: updatedCoinsPerSecondPacks,
              CoinsPerTapPacks: updatedCoinsPerTapPacks,
            };
          });
        } else if (pack.endTime && endTime.diff(currentTime, 'hour') <= 1) {
          // If the pack is still active and the end time is within 1 hour, keep it in the list
          updatedPurchasedPacks.push(pack);
        }
      });

      // Update the state with the filtered list of active packs
      setMinePackPurchased(updatedPurchasedPacks);
    }, 1000);

    return () => clearInterval(handleWatchTheListPackPurchased); // Clear the interval when the component unmounts
  }, [purchasedPacks, setMinePackPurchased, setListMinePack]);
};
