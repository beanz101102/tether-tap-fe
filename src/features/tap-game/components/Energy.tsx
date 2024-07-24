/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { useEnergy } from "@/features/tap-game/hooks/useEnergy";
import { useRouter } from "next/navigation";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import Image from "next/image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { useEffect, useRef } from "react";
import NextImage from "@/components/common/next-image";
import Link from "next/link";

const Energy = () => {
  const { isLoading } = useGetUserTapGameInfo();
  const { currentEnergy, maxEnergy } = useEnergy();
  const router = useRouter();

  return (
    <Link
      href={"/boost"}
      prefetch
      className={
        "main-bg-slate-op flex h-[46px] w-fit items-center rounded-full px-4"
      }
    >
      <NextImage
        src={"/img/tap-game/energy.webp"}
        width={32}
        height={32}
        className={"mr-1 h-8 w-8"}
        alt={"energy"}
      />
      <WrapSkeleton className={"h-[20px] w-[50px]"} isSkeleton={isLoading}>
        <div className={"flex flex-col"}>
          <p className={"main-text-primary font-bold"}>
            {formatNumberWithCommas(currentEnergy)}
          </p>
          <p className={"main-text-primary text-xs font-medium"}>
            /{formatNumberWithCommas(maxEnergy)}
          </p>
        </div>
      </WrapSkeleton>
    </Link>
  );
};

export const EnergyRecoveryGlobal = () => {
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const { handleEnergy, currentEnergy, maxEnergy } = useEnergy();
  const energyRef = useRef(currentEnergy);

  useEffect(() => {
    energyRef.current = currentEnergy; // Update the ref value whenever energy changes for avoid create new setInterval each time changed
  }, [currentEnergy]);

  useEffect(() => {
    if (!userTapGameInfo) return;
    const intervalId = setInterval(() => {
      if (energyRef.current >= maxEnergy) return;
      const energyRecovery = currentEnergy + 3 * 1000;
      const energyUpdateData =
        energyRecovery >= maxEnergy ? maxEnergy : energyRecovery;
      handleEnergy(energyUpdateData);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userTapGameInfo]);
  return null;
};

export default Energy;
