"use client";
import NextImage from "@/components/common/next-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSkipReferral } from "@/libs/hooks/useSkipReferral";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useHandleEnterReferralCode } from "../hooks/useHandleEnterReferralCode";

const EnterReferral = () => {
  const [code, setCode] = useState("");
  const { currentUser } = useGetCurrentUser();
  const { handleSkipReferral, isLoading: isLoadingSkipReferral } =
    useSkipReferral();
  const { handleEnterReferralCode, isLoading } = useHandleEnterReferralCode();

  return (
    <div className="p-4">
      <p className="main-text-primary text-center text-2xl font-semibold">
        Referral code
      </p>
      <NextImage
        className="mx-auto h-[110px] w-[110px]"
        src="/img/tap-game/enter_referral_code.webp"
        alt="referral"
      />
      <p className="main-text-secondary mb-6 mt-2 text-center text-sm  font-normal">
        Enter your referral code to continue
      </p>
      <Input
        placeholder="Enter Referral code"
        className="main-border-color main-text-primary w-full"
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
      <Button
        onClick={() => {
          handleEnterReferralCode(code);
        }}
        loading={isLoading}
        disabled={code?.trim() == ""}
        className={"mt-6 w-full !h-[44px] rounded-md"}
      >
        Send
      </Button>
      <Button
        variant={'outline'}
        loading={isLoadingSkipReferral}
        className={"mt-4 w-full !h-[44px] rounded-md"}
        onClick={handleSkipReferral}
      >
        Skip
      </Button>
    </div>
  );
};

export default EnterReferral;
