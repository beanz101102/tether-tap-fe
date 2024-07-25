import NextImage from "@/components/common/next-image";
import { cn } from "@/utils/cn";
import { formatNumberWithCommas } from "@/utils/formatNumber";

export interface ItemRankingProps {
  imgUrl: string;
  name: string;
  rank: number;
  coins: number;
}

const ItemRanking = ({
  data,
  className,
}: {
  data: ItemRankingProps;
  className?: string;
}) => {
  const { imgUrl, name, rank, coins } = data;
  return (
    <div
      className={cn(
        "main-bg-secondary flex items-center justify-between rounded-lg px-4 py-2",
        className,
      )}
    >
      <div className={"flex items-center"}>
        <NextImage
          src={imgUrl}
          alt={name}
          className={"h-12 w-12 rounded-full"}
        />
        <div className={"pl-2"}>
          <p className={"main-text-primary text-lg font-semibold"}>{name}</p>
          <div className={"flex items-center"}>
            <NextImage
              src={"/img/tap-game/coin.webp"}
              alt={"coin"}
              className={"h-5 w-5"}
            />
            <p className={"main-text-primary pl-1 text-sm font-semibold"}>
              {formatNumberWithCommas(coins)}
            </p>
          </div>
        </div>
      </div>
      <p
        className={
          "stroke-text-ranking main-text-primary text-3xl font-semibold"
        }
      >
        {rank}
      </p>
    </div>
  );
};

export default ItemRanking;
