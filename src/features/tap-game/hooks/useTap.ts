import { atom, useAtom } from "jotai";
import { useEnergy } from "@/features/tap-game/hooks/useEnergy";
import { ScoreAtom } from "@/features/tap-game/constants/tap-game";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  TouchEvent,
  useEffect,
} from "react";
import { AnimationPositionPerTap } from "@/features/tap-game/interfaces/tap-game";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { useUpdateUserCoinsWhenTap } from "@/features/tap-game/hooks/useUpdateUserCoinsWhenTap";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import dayjs from "dayjs";
import { debounce, uniqBy } from "lodash";
import { initHapticFeedback } from "@tma.js/sdk";
import BigNumber from "bignumber.js";

export const isUpdateCoinBalanceAtom = atom<boolean>(false);
export const useTap = () => {
  const [isUpdateCoinBalance, setIsUpdateCoinBalance] = useAtom(
    isUpdateCoinBalanceAtom,
  );
  const { handleEnergy, currentEnergy } = useEnergy();
  const [score, setScore] = useAtom(ScoreAtom);
  const tapCountRef = useRef(0);
  const tapCountSendDataRef = useRef(0);
  const tapCountAtLastTimeRef = useRef(0);

  const [taps, setTaps] = useState<AnimationPositionPerTap[]>([]);
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const { handleUpdateUserCoinsWhenTap } = useUpdateUserCoinsWhenTap();
  const hapticFeedback = initHapticFeedback();
  const coinGainPerTap = Number(userTapGameInfo?.coins_earned_per_tap);
  const currentEnergyRef = useRef(currentEnergy);

  const isDisable = useMemo(
    () => currentEnergy - Number(userTapGameInfo?.coins_earned_per_tap) < 0,
    [currentEnergy, userTapGameInfo?.coins_earned_per_tap],
  );

  useEffect(() => {
    currentEnergyRef.current = currentEnergy;
  }, [currentEnergy]);

  const handleUpdateCorePoint = (touchesLength: number) => {
    if (touchesLength <= 0) return;
    tapCountRef.current += touchesLength;
    setScore((prevScore) =>
      new BigNumber(prevScore)
        .plus(new BigNumber(touchesLength * coinGainPerTap))
        .toString(),
    );
    const energyConsumed = currentEnergyRef?.current - touchesLength;
    const newEnergy = energyConsumed <= 0 ? 0 : energyConsumed;
    handleEnergy(newEnergy);
  };

  const handlePushAnimation = (touches: React.Touch[], rect: DOMRect) => {
    const newTaps: AnimationPositionPerTap[] = [];
    const maxAnimatedShowContemporaneous = 15;
    touches.forEach((touch) => {
      const touchId =
        touch.identifier + touch.clientX + touch.clientY + dayjs().valueOf();
      newTaps.push({
        id: touchId,
        x:
          (touch.clientX < 71
            ? 75
            : touch.clientX > 446
              ? 446
              : touch.clientX) -
          rect.right / 2,
        y: (touch.clientY < 215 ? 215 : touch.clientY) - rect.bottom / 3,
        value: coinGainPerTap,
      });
    });

    if (newTaps.length > 0) {
      setTaps((prevTaps: any) => {
        if (prevTaps.length >= maxAnimatedShowContemporaneous) {
          // to avoid push too much animation
          return uniqBy([...prevTaps, newTaps[0]], "id");
        }

        return uniqBy([...prevTaps, ...newTaps], "id");
      });
    }
  };

  const handleTap = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (currentEnergyRef?.current - coinGainPerTap < 0) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const touches = uniqBy(Array.from(event.touches), "identifier");
      // handle slice touches if it can't afford the energy
      const maxAffordableTouches = Math.floor(currentEnergyRef?.current / coinGainPerTap);
      if (currentEnergyRef?.current - touches.length * coinGainPerTap < 0) {
        if (maxAffordableTouches === 0) {
          return; // If no touches can be afforded, exit the function.
        }
        touches.splice(maxAffordableTouches);
      }

      // main logic
      debouncedHandleMainLogic(touches, rect);
      hapticFeedback.impactOccurred("heavy");
    },
    [],
  );

  const debouncedHandleMainLogic = debounce(
    (touches: React.Touch[], rect: DOMRect) => {
      handlePushAnimation(touches, rect);
      handleUpdateCorePoint(touches.length);
    },
    50,
  );

  useEffect(() => {
    const idInterval = setInterval(() => {
      if (
        tapCountRef.current === 0 ||
        tapCountRef.current === tapCountAtLastTimeRef.current
      ) {
        !isUpdateCoinBalance && setIsUpdateCoinBalance(true);
        return;
      }

      setIsUpdateCoinBalance(false);
      const dataSend = tapCountRef.current - tapCountSendDataRef.current;
      handleUpdateUserCoinsWhenTap({
        increasedTaps: dataSend,
      });

      tapCountSendDataRef.current += dataSend;
      tapCountAtLastTimeRef.current = tapCountRef.current;
    }, 3000);

    return () => {
      clearInterval(idInterval);
    };
  }, [
    coinGainPerTap,
    isUpdateCoinBalance,
  ]);

  return { score, taps, setTaps, handleTap, isDisable };
};
