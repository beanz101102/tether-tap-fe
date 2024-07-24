import NextImage from "@/components/common/next-image";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { FC } from "react";

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
  return (
    <div
      className={
        "main-border-divider-primary main-bg-secondary flex w-full items-center justify-between rounded-md border p-2"
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
      <div className={"flex w-[25%] items-center justify-end gap-1"}>
        <div className={"h-4 w-4"}>
          <NextImage
            src={"/img/tap-game/coin.svg"}
            alt={"coin"}
            className={"h-4 w-4"}
          />
        </div>
        <p className={"main-text-primary text-sm font-semibold"}>
          {formatNumberWithCommas(Number(coinEarned))}
        </p>
      </div>
    </div>
  );
};

export default FriendItem;
