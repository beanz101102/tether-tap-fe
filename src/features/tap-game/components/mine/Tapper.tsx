"use client";
import MineItem from "@/features/tap-game/components/mine/MineItem";
import { useGetListMinePack } from "@/features/tap-game/hooks/useGetListMinePack";
import { Loading } from "@/components/common/Loading";

const Tapper = () => {
  const { listMinePack, isLoading } = useGetListMinePack();

  if (isLoading) {
    return (
      <div className={"flex items-center justify-center"}>
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {listMinePack.CoinsPerTapPacks.map((pack, index) => (
        <MineItem
          id={pack.id}
          name={pack.name}
          imgUrl={pack.image}
          isActive={pack.isActive}
          coinPerHour={pack.upgradedAmt}
          price={pack.cost}
          packType={pack.packType}
          duration={pack.duration}
          endTime={pack.endTime}
        />
      ))}
    </div>
  );
};

export default Tapper;
