/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NextImage from "@/components/common/next-image";
import Link from "next/link";

const ActionBoost = () => {
  const { t } = useTranslation("tap-game", {
    keyPrefix: "boost",
  });
  const router = useRouter();
  return (
    <Link
      href={"/boost"}
      prefetch
      className={
        "main-bg-slate-op flex h-[46px] w-[117px] cursor-pointer items-center rounded-full px-4"
      }
    >
      <NextImage
        width={32}
        height={32}
        src={"/img/tap-game/boost.webp"}
        alt={"boost"}
        className={"mr-1 h-8 w-8"}
      />
      <p className={"main-text-primary font-bold"}>{t("title")}</p>
    </Link>
  );
};
export default ActionBoost;
