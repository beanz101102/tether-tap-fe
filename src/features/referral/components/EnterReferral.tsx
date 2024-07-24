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
      <NextImage
        className="mx-auto h-[120px] w-[120px]"
        src="/img/tap-game/referral_pepe.webp"
        alt="referral"
      />
      <p className="main-text-primary text-center text-2xl font-semibold">
        Referral code
      </p>
      <p className="main-text-secondary mb-6 mt-2 text-center text-sm  font-normal">
        Get a referral code, earn up to 775M coins!
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
        style={{
          boxShadow: "0px 3px 0px 0px #047857",
        }}
        className={"mt-6 w-full rounded-md !bg-[#059669] !text-white"}
      >
        Send
      </Button>
      <Button
        style={{
          boxShadow: "0px 3px 0px 0px #3F3F46",
        }}
        loading={isLoadingSkipReferral}
        className={"mt-4 w-full rounded-md !bg-[#27272A] !text-white"}
        onClick={handleSkipReferral}
      >
        Skip
      </Button>
    </div>
  );
};

export default EnterReferral;
