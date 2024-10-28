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
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/utils/cn";
const EnterReferral = () => {
  const [code, setCode] = useState("");
  const { currentUser } = useGetCurrentUser();
  const { handleSkipReferral, isLoading: isLoadingSkipReferral } =
    useSkipReferral();
  const { handleEnterReferralCode, isLoading } = useHandleEnterReferralCode();
  const { t } = useTranslation("referral");

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pb-10 pt-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Enter Referral Code
        </h1>
        <p className="max-w-[320px] text-sm text-gray-500">
          Enter a referral code to get bonus rewards and join your friend's team
        </p>
      </div>

      {/* Image Section */}
      <div className="relative mb-8 h-[180px] w-[180px]">
        <NextImage
          className="h-full w-full object-contain"
          src="/img/referral.webp"
          alt="referral"
        />
      </div>

      {/* Input Section */}
      <div className="w-full max-w-[400px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Referral Code
          </label>
          <Input
            placeholder="Enter your friend's code"
            className={cn(
              "h-12 rounded-lg border !border-gray-200 !bg-white px-4",
              "text-gray-900 placeholder:text-gray-400",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
              "transition-all duration-200",
            )}
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
        </div>

        {/* Benefits Section */}
        <div className="space-y-3 rounded-lg bg-blue-50 p-4">
          <h3 className="text-sm font-medium text-blue-800">
            Benefits of using referral code:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-blue-700">
              <CheckCircle2 className="mr-2 h-4 w-4 flex-shrink-0" />
              Get 0.00001 USDT bonus (Telegram Normal)
            </li>
            <li className="flex items-center text-sm text-blue-700">
              <CheckCircle2 className="mr-2 h-4 w-4 flex-shrink-0" />
              Get 0.00002 USDT bonus (Telegram Premium)
            </li>
            <li className="flex items-center text-sm text-blue-700">
              <CheckCircle2 className="mr-2 h-4 w-4 flex-shrink-0" />
              Earn 10% from friend's earnings
            </li>
            <li className="flex items-center text-sm text-blue-700">
              <CheckCircle2 className="mr-2 h-4 w-4 flex-shrink-0" />
              Join exclusive team events
            </li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={() => handleEnterReferralCode(code)}
            loading={isLoading}
            disabled={code?.trim() === ""}
            className={cn(
              "h-12 w-full rounded-lg",
              "bg-blue-600 hover:bg-blue-700",
              "font-medium text-white",
              "transition-all duration-200",
            )}
          >
            Submit Code
          </Button>

          <Button
            variant="outline"
            loading={isLoadingSkipReferral}
            onClick={handleSkipReferral}
            className={cn(
              "h-12 w-full rounded-lg",
              "border-gray-200 text-gray-600",
              "hover:bg-gray-50",
              "transition-all duration-200",
            )}
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterReferral;
