import NextImage from "@/components/common/next-image";
import WrapSkeleton from "@/components/ui/wrap-skeleton";
import {formatNumberWithCommas} from "@/utils/formatNumber";
import {useGetUserTapGameInfo} from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import {useEnergy} from "@/features/tap-game/hooks/useEnergy";

const EnergyProgress = () => {
  const { isLoading } = useGetUserTapGameInfo();
  const { currentEnergy, maxEnergy } = useEnergy();

  return (
    <div className={'w-full flex items-center justify-between gap-2'}>
      <div className={'flex items-center gap-1 w-[25%]'}>
        <NextImage
          src={"/img/tap-game/energy.svg"}
          width={32}
          height={32}
          className={"mr-1 h-6 w-6 min-w-6"}
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
      </div>
      <div className={'w-[70%]'}>
        <div
          className={
            "bg-main-border-secondary main-bg-muted h-[11px] w-full overflow-hidden rounded-full"
          }
        >
          <div
            className={"bg-main-text-primary h-[11px] rounded-full"}
            style={{
              width: `${(currentEnergy / maxEnergy) * 100}%`,
              background:
                "linear-gradient(90deg, #8CD7C1 23.5%, #DAFFF4 45.5%, #51C0A8 69.5%, #43A590 90.5%)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default EnergyProgress;