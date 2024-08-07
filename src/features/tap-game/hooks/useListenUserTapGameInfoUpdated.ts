import { useAtom } from "jotai/index";
import { useEffect, useMemo } from "react";
import { cloneDeep } from "lodash";
import {
  action_type,
  openModalLevelUpAtom,
  ScoreAtom,
} from "../constants/tap-game";
import { useDispatch } from "react-redux";
import { WsUpdateType } from "@/libs/constants/wsUpdateType";
import { getDataListenUpdateByType } from "@/utils/getDataListenUpdateByType";
import { useGetDataReduxByRouter } from "@/libs/hooks/useGetDataReduxByRouter";
import {
  SocketRoutes,
  addReceivedData,
} from "@/libs/redux/features/socketSlice";
import {
  useGetUserTapGameInfo,
  userTapGameInfoAtom,
} from "./useGetUserTapGameInfo";

export const useListenUserTapGameInfoUpdated = () => {
  const [score] = useAtom(ScoreAtom);
  const [userTapGameInfo, setUserTabGameInfo] = useAtom(userTapGameInfoAtom);
  const [, setIsOpenModalLevelUp] = useAtom(openModalLevelUpAtom);
  const { receivedData } = useGetDataReduxByRouter(SocketRoutes.onUserUpdated);
  const dispatch = useDispatch();
  const dataListen = useMemo(() => {
    return getDataListenUpdateByType(
      receivedData,
      WsUpdateType.USER_TAP_GAME_INFO_UPDATED,
    )?.data;
  }, [receivedData]);

  const [, setScore] = useAtom(ScoreAtom);

  useEffect(() => {
    if (!dataListen) return;
    const userTapGameInfoClone = cloneDeep(userTapGameInfo);

    const energy =
      Number(userTapGameInfoClone?.energy_balance) >
        dataListen?.energy_balance ||
      dataListen?.energy_balance === userTapGameInfoClone?.max_energy_reached
        ? dataListen?.energy_balance
        : userTapGameInfoClone?.energy_balance;

    const coins =
      Number(userTapGameInfoClone?.coins_balance) <
      Number(dataListen?.coins_balance)
        ? dataListen?.coins_balance
        : userTapGameInfoClone?.coins_balance;

    if (Number(score) < Number(dataListen?.coins_balance)) {
      setScore(dataListen?.coins_balance);
    }

    const handleCalculatorBalance = () => {
      if (
        dataListen?.data_info_if_has_changed?.changed_amount &&
        userTapGameInfoClone?.coins_balance
      ) {
        let newBalance = userTapGameInfoClone.coins_balance;
        if (
          dataListen?.data_info_if_has_changed?.action_type ===
          action_type.DECREASE
        ) {
          newBalance -= dataListen?.data_info_if_has_changed?.changed_amount;
        } else {
          newBalance += dataListen?.data_info_if_has_changed?.changed_amount;
        }

        setScore(newBalance);
        return newBalance;
      }

      return dataListen?.coins_balance < score
        ? coins
        : userTapGameInfoClone?.coins_balance;
    };

    setUserTabGameInfo({
      ...dataListen,
      coins_balance: handleCalculatorBalance(),
      energy_balance: energy,
    });
    dispatch(
      addReceivedData({ route: SocketRoutes.onUserUpdated, data: null }),
    );
  }, [JSON.stringify(dataListen)]);
};
