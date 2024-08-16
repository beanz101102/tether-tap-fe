"use client";
import NextImage from "@/components/common/next-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSkipReferral } from "@/libs/hooks/useSkipReferral";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useHandleEnterReferralCode } from "../hooks/useHandleEnterReferralCode";
import { Trans } from "react-i18next";
import { useTranslation } from "@/app/[lng]/i18n/client";
import { urlTelegramChannel } from "@/features/tap-game/constants/tap-game";

const EnterReferral = () => {
  const [code, setCode] = useState("");
  const { currentUser } = useGetCurrentUser();
  const { handleSkipReferral, isLoading: isLoadingSkipReferral } =
    useSkipReferral();
  const { handleEnterReferralCode, isLoading } = useHandleEnterReferralCode();
  const { t } = useTranslation("referral");

  return (
    <div className="p-4">
      <p className="main-text-primary pb-1 text-center text-2xl font-semibold">
        {t("referral_code")}
      </p>
      <NextImage
        className="mx-auto h-[110px] w-[110px]"
        src="/img/tap-game/enter_referral_code.webp"
        alt="referral"
      />
      <p className="main-text-secondary mb-6 mt-2 text-center text-sm  font-normal">
        {t("sub_title_referral_code")}
      </p>
      <Input
        placeholder={t("enter_referral_code")}
        className="main-border-color main-text-primary w-full"
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
      <p className="main-text-secondary mx-auto mt-6 w-[75%] text-center text-sm font-normal">
        <Trans
          t={t}
          i18nKey={`des_referral_code`}
          onClick={() => {
            window.Telegram.WebApp.openTelegramLink(urlTelegramChannel);
          }}
          components={{
            // eslint-disable-next-line
            span: <span className="main-text-primary font-semibold" />,
          }}
        />
      </p>
      <Button
        onClick={() => {
          handleEnterReferralCode(code);
        }}
        loading={isLoading}
        disabled={code?.trim() == ""}
        className={"mt-6 !h-[44px] w-full rounded-md"}
      >
        {t("send")}
      </Button>
      <Button
        variant={"outline"}
        loading={isLoadingSkipReferral}
        className={"mt-4 !h-[44px] w-full rounded-md"}
        onClick={handleSkipReferral}
      >
        {t("skip")}
      </Button>
    </div>
  );
};

export default EnterReferral;
