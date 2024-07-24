import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { Gamepad2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const JoinTabGameDesktop = () => {
  const { t } = useTranslation("tap-game");
  const { currentUser } = useGetCurrentUser();
  return (
    <div>
      <div className={"flex h-[100vh] flex-col items-center justify-center"}>
        <p
          className={
            "main-text-primary mb-6 px-4 text-center text-2xl font-semibold"
          }
        >
          {t("play_on_mobile")}
        </p>
        <Image
          src={"/img/tap-game/qr_telegram_bot.png"}
          alt={"Qr telegram"}
          width={200}
          height={200}
          style={{
            borderRadius: "12px",
          }}
          className={"h-[200px] w-[200px] !rounded-xl"}
        />

        <p className={"main-text-secondary mt-3 text-base font-medium"}>
          @much_pepe_bot
        </p>
        <div
          className={
            "mt-4 flex w-fit max-w-[380px] flex-wrap items-center justify-between"
          }
        >
          <a
            href={`https://t.me/much_pepe_bot/app?startapp=${currentUser?.ref_code}`}
            target={"_blank"}
            rel="noreferrer"
            className={"mb-2 !w-full"}
          >
            <Button className={"w-full"}>
              <div className={"flex items-center px-2"}>
                <Gamepad2 className={"mr-2"} />
                Join now
              </div>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinTabGameDesktop;
