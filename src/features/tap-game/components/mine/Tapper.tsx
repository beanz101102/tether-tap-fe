"use client";
import MineItem from "@/features/tap-game/components/mine/MineItem";

const Tapper = () => {
  const tapperTaskMock = [
    {
      id: 1,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: true
    },
    {
      id: 2,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
    {
      id: 3,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
    {
      id: 4,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
    {
      id: 5,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
    {
      id: 6,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
    {
      id: 7,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
    {
      id: 8,
      name: 'Gas Fee Master',
      coinPerHour: 0.0000000001,
      price: 0.1,
      imgUrl: '/img/tap-game/coin.svg',
      isActive: false
    },
  ]

  return (
    <div className={'pb-[66px]'}>
      {
        tapperTaskMock.map((task, index) => (
          <MineItem
            id={task.id}
            name={task.name}
            imgUrl={task.imgUrl}
            isActive={task.isActive}
            coinPerHour={task.coinPerHour}
            price={task.price}
          />
        ))
      }
    </div>
  )
}

export default Tapper;