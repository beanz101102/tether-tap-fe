import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { FC } from "react";
import {useTranslation} from "@/app/[lng]/i18n/client";

interface FriendItemProps {
  avatar: string;
  name: string;
  friendCoins: number;
  coinEarned: number;
}

const FriendItem: FC<FriendItemProps> = ({
  avatar,
  friendCoins,
  coinEarned,
  name,
}) => {
  const {t} = useTranslation("tap-game", {
    keyPrefix: "friends",

  })
  return (
    <div
      className={
        "main-bg-primary flex w-full items-center justify-between rounded-lg px-4 py-2"
      }
    >
      <div className={"flex w-[75%] max-w-[75%] items-center gap-2"}>
        <div className={"h-10 w-10 overflow-hidden rounded-full"}>
          <NextImage
            src={avatar || "/img/richard.svg"}
            alt={"avatar"}
            className={"h-full w-full rounded-full"}
            // fallbackUrl={'/img/chat/avatar.webp'}
          />
        </div>
        <div className={"flex flex-col"}>
          <p className={"main-text-primary font-medium"}>{name}</p>
          <div className={"flex items-center gap-1"}>
            <NextImage
              src={"/img/tap-game/coin.svg"}
              alt={"coin"}
              className={"h-4 w-4"}
            />
            <p className={"main-text-primary text-sm font-semibold"}>
              {formatNumberWithCommas(Number(friendCoins))}
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-col w-[25%] items-center justify-end"}>
        <p className={"text-sm font-normal ml-auto text-right main-text-muted"} >{t('coin_earn')}</p>
        <div className={'flex items-center ml-auto'}>
          <div className={"h-4 w-4"}>
            <NextImage
                src={"/img/tap-game/coin.svg"}
                alt={"coin"}
                className={"h-4 w-4"}
            />
          </div>
          <p className={"main-text-warning pl-1 text-sm font-semibold"}>
            {formatNumberWithCommas(Number(coinEarned))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
