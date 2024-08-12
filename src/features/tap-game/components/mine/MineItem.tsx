"use client";
import {FC} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {formatNumberWithCommas} from "@/utils/formatNumber";
import {useBuyMinePack} from "@/features/tap-game/hooks/useBuyMinePack";
import {PackType} from "@/features/tap-game/hooks/useGetListMinePack";
import {useTranslation} from "@/app/[lng]/i18n/client";

interface MineItemProps {
  id: number;
  name: string;
  imgUrl: string;
  isActive: boolean;
  coinPerHour: number;
  price: number;
  packType: PackType;
}
const MineItem: FC<MineItemProps> = ({
  id,
  coinPerHour,
  name,
  price,
  imgUrl,
  isActive,
  packType
}) => {
  const {t} = useTranslation('price')
  const {handleBuyPack, loading} = useBuyMinePack();

  return (
    <div
      className={
        "my-2 flex w-full items-center justify-between gap-2 rounded bg-[#18181B] px-3 py-2"
      }
    >
      <div className={"flex"}>
        <div className={'h-14 w-14 min-w-14 rounded-lg bg-[#27272A] p-2'}>
          {/*<Image*/}
          {/*  width={32}*/}
          {/*  height={32}*/}
          {/*  src={imgUrl}*/}
          {/*  alt={name}*/}
          {/*  className={"h-14 w-14 min-w-14 rounded-lg bg-[#27272A] p-2"}*/}
          {/*/>*/}
        </div>
        <div className={"ml-2 flex flex-col"}>
          <p className={"main-text-primary xs:text-base text-sm font-bold"}>
            {name}
          </p>
          <p className={"main-text-secondary text-sm font-normal"}>
            {t('coin_per_hour')}
          </p>
          <div className={"flex items-center gap-1"}>
            <Image
              width={20}
              height={20}
              src={"/img/tap-game/coin.webp"}
              alt={"coin"}
              className={"mr-2 h-5 w-5"}
            />
            <p className={"main-text-primary font-bold"}>
              + {formatNumberWithCommas(coinPerHour)}
            </p>
          </div>
        </div>
      </div>
      {!isActive && (
        <Button
          variant={"secondary"}
          className={
            "flex h-fit max-h-fit w-fit max-w-[107px] items-center justify-center gap-1 !bg-[#3F3F46] px-2"
          }
          disabled={loading || isActive}
          loading={loading}
          onClick={() => handleBuyPack(id, packType, price)}
        >
          <p className={"main-text-secondary text-xs"}>{t('price')}</p>
          <div className={"flex items-center gap-1"}>
            <Image
              width={12}
              height={12}
              src={"/img/tap-game/coin.webp"}
              alt={"coin"}
              className={"h-3 w-3"}
            />
            <p className={"main-text-primary text-xs font-bold"}>
              {formatNumberWithCommas(price)}
            </p>
          </div>
        </Button>
      )}
    </div>
  );
};

export default MineItem;
