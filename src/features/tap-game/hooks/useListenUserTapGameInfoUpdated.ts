import { WsUpdateType } from "@/libs/constants/wsUpdateType";
import { useGetDataReduxByRouter } from "@/libs/hooks/useGetDataReduxByRouter";
import {
  SocketRoutes,
  addReceivedData,
} from "@/libs/redux/features/socketSlice";
import { getDataListenUpdateByType } from "@/utils/getDataListenUpdateByType";
import BigNumber from "bignumber.js";
import { useAtom } from "jotai/index";
import { cloneDeep } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ScoreAtom } from "../constants/tap-game";
import { userTapGameInfoAtom } from "./useGetUserTapGameInfo";

export const useListenUserTapGameInfoUpdated = () => {
  const [score, setScore] = useAtom(ScoreAtom);
  const [userTapGameInfo, setUserTabGameInfo] = useAtom(userTapGameInfoAtom);
  const { receivedData } = useGetDataReduxByRouter(SocketRoutes.onUserUpdated);
  const dispatch = useDispatch();

  const dataListen = useMemo(() => {
    return getDataListenUpdateByType(
      receivedData,
      WsUpdateType.USER_TAP_GAME_INFO_UPDATED,
    )?.data;
  }, [receivedData]);

  console.log("dataListen", dataListen);

  useEffect(() => {
    if (!dataListen) return;
    const userTapGameInfoClone = cloneDeep(userTapGameInfo);

    const energy =
      new BigNumber(userTapGameInfoClone?.energy_balance ?? 0).isGreaterThan(
        dataListen?.energy_balance,
      ) ||
      dataListen?.energy_balance === userTapGameInfoClone?.max_energy_reached
        ? dataListen?.energy_balance
        : userTapGameInfoClone?.energy_balance;

    if (new BigNumber(score).isLessThan(dataListen?.coins_balance)) {
      setScore(dataListen?.coins_balance.toString());
    }

    setUserTabGameInfo({
      ...dataListen,
      energy_balance: energy,
    });
    dispatch(
      addReceivedData({ route: SocketRoutes.onUserUpdated, data: null }),
    );
  }, [JSON.stringify(dataListen)]);
};
