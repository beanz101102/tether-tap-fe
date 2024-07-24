import levelUpAnimationJson from "../../../../public/animations/levelUp.json";
import { useTranslation } from "react-i18next";
import { useGetUserTapGameInfo } from "@/features/tap-game/hooks/useGetUserTapGameInfo";
import { useGetAmountRewardReferral } from "@/features/tap-game/hooks/useGetAmountRewardReferral";
import { useAtom } from "jotai";
import {
  listRanking,
  openModalLevelUpAtom,
} from "@/features/tap-game/constants/tap-game";
import { useMemo } from "react";
import { ListRankingProps } from "@/features/tap-game/interfaces/tap-game";
import ShadModal from "@/components/ui/ShadModal";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import Image from "next/image";
import Lottie from "react-lottie";
import { Button } from "@/components/ui/button";

const LevelUpModal = () => {
  const { t } = useTranslation("tap-game");
  const { t: tBoost } = useTranslation("tap-game", { keyPrefix: "boost" });
  const { userTapGameInfo } = useGetUserTapGameInfo();
  const [isOpenModalLevelUp, setIsOpenModalLevelUp] =
    useAtom(openModalLevelUpAtom);

  const rewardLevelUp = useMemo(
    () =>
      listRanking?.find(
        (item) =>
          item.level ===
          Number(userTapGameInfo?.user_coins_level_info?.current_level),
      ),
    [userTapGameInfo?.user_coins_level_info?.current_level],
  ) as ListRankingProps;

  return (
    <ShadModal isOpen={isOpenModalLevelUp} onOpen={setIsOpenModalLevelUp}>
      <div className={"relative pt-6"}>
        <Image
          width={96}
          height={96}
          src={"/img/tap-game/partying_meme.webp"}
          alt={"partying face"}
          className={"absolute left-[50%]  z-10 w-[96px]  -translate-x-[50%]"}
        />

        <div className={"-mt-14"}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: levelUpAnimationJson,
            }}
            height={240}
            width={240}
          />
          <p
            className={
              "main-text-primary -mt-20 text-center text-2xl font-semibold"
            }
          >
            {t("level_up")}
          </p>
          <div
            className={
              "main-border-color mt-[20px] flex justify-between rounded-xl border px-4 py-2"
            }
          >
            <div>
              <p className={"main-text-secondary text-base font-normal"}>
                {" "}
                {tBoost("multitap")}
              </p>
              <p className={"main-text-primary mt-1 text-base font-bold"}>
                +{rewardLevelUp?.coinPerTap}
              </p>
            </div>
            <div className={"text-right"}>
              <p className={"main-text-secondary text-base font-normal"}>
                {" "}
                {tBoost("energy_limit")}
              </p>
              <p className={"main-text-primary mt-1 text-base font-bold"}>
                +{formatNumberWithCommas(rewardLevelUp?.bonusEnergy)}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpenModalLevelUp(false)}
            style={{
              boxShadow: "0px 3px 0px 0px #047857",
            }}
            className={"mb-1 mt-5 w-full rounded-md !bg-[#059669] !text-white"}
          >
            {t("got_it")}
          </Button>
        </div>
      </div>
    </ShadModal>
  );
};

export default LevelUpModal;
