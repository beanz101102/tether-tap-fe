"use client";
import { Loading } from "@/components/common/Loading";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Image from "next/image";
import { useTranslation } from "@/app/[lng]/i18n/client";
import NextImage from "./next-image";
import { cn } from "@/utils/cn";

const ConnectingApp = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "home_page",
  });
  const [progress, setProgress] = useState(0);

  const listSocail = [
    {
      title: "telegram",
      url: "https://t.me/tethercoin",
    },
    {
      title: "twitter",
      url: "https://twitter.com/tethercoin",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 10; // Fast increment initially
        } else if (prevProgress >= 90 && prevProgress < 95) {
          return prevProgress + 5; // Slower increment as it approaches 100%
        }
        return prevProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"relative flex h-[100vh] w-full flex-col items-center "}>
      <Image
        src={"/img/connection_app_bg.webp"}
        alt={"loading bg"}
        layout={"fill"}
        objectFit={"cover"}
        quality={100}
      />
      <LoadingBar
        style={{
          background: "linear-gradient(90deg, green 0%, #FFFFC7 144.32%)",
        }}
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />
      <div className="z-10 mt-[100px] flex-col text-center">
        <p className="text-2xl font-medium text-white">{t("tap_and_earn")}</p>
        <p className="text-[48px] font-extrabold text-white">
          {t("tether_coin")}
        </p>
      </div>
      <div className="z-10 flex flex-grow items-center justify-center">
        <Loading className={"main-text-primary"} />
      </div>{" "}
      <div className="z-10 mb-8 mt-auto flex flex-col text-center">
        <p className="main-text-secondary text-sm font-normal">
          {t("wait")}...
        </p>
        <p className="main-text-primary text-base font-medium">
          {t("des_wait")}
        </p>
        <p className="main-text-secondary mt-6 text-sm font-medium">
          {t("more_chanel")}
        </p>
        <div className="mx-auto mt-2 flex w-fit">
          {listSocail?.map((e, idx) => {
            return (
              <div
                className={cn(
                  "main-bg-default flex h-8 w-8 flex-col items-center justify-center rounded-full",
                  idx != listSocail?.length - 1 && "mr-4",
                )}
                key={`item_socail_${idx}`}
              >
                <NextImage
                  className="h-4 w-4"
                  src={`/img/tap-game/${e?.title}.svg`}
                  alt={e?.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectingApp;
