"use client";
import {FC} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {formatNumberWithCommas} from "@/utils/formatNumber";

interface MineItemProps {
  id: number;
  name: string;
  imgUrl: string;
  isActive: boolean;
  coinPerHour: number;
  price: number;
}
const MineItem: FC<MineItemProps> = ({ id, coinPerHour, name, price, imgUrl, isActive }) => {

  return (
    <div className={'w-full flex items-center gap-2 rounded px-3 py-2 bg-[#18181B] my-2'}>
      <Image width={32} height={32} src={imgUrl} alt={name} className={"rounded-lg bg-[#27272A] p-2 w-14 h-14 min-w-14"} />
      <div className={'flex flex-col w-[50%]'}>
        <p className={'main-text-primary font-bold'}>{name}</p>
        <p className={'main-text-secondary text-sm font-normal'}>Coin per hour</p>
        <div className={'flex items-center gap-1'}>
          <Image
            width={20}
            height={20}
            src={"/img/tap-game/coin.svg"}
            alt={"coin"}
            className={"mr-2 h-5 w-5"}
          />
          <p className={"main-text-primary font-bold"}>
            + {formatNumberWithCommas(coinPerHour)}
          </p>
        </div>
      </div>
      {
        !isActive && (
          <Button variant={'secondary'} className={'flex gap-3 w-fit !bg-[#3F3F46]'}>
            <p className={'main-text-secondary'}>Price</p>
            <div className={'flex items-center gap-1'}>
              <Image
                width={20}
                height={20}
                src={"/img/tap-game/coin.svg"}
                alt={"coin"}
                className={"mr-2 h-5 w-5"}
              />
              <p className={"main-text-primary font-bold"}>
                {formatNumberWithCommas(price)}
              </p>
            </div>
          </Button>
        )
      }
    </div>
  )
}

export default MineItem;