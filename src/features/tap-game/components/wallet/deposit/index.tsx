"use client";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/features/tap-game/hooks/useWindowSize";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { copyToClipboardWithCommand } from "@/utils/copyToClipboardWithCommand";
import { truncateAddress } from "@/utils/truncateAddress";

const Deposit = () => {
  const { currentUser } = useGetCurrentUser();
  const { width } = useWindowSize();
  const address = currentUser?.address;

  return (
    <div className={"flex w-full flex-col items-center justify-center px-4"}>
      <p className="main-text-primary pt-6 text-center text-4xl font-semibold">
        Deposit
      </p>
      <p className="main-text-secondary mt-2 max-w-[500px] text-center text-sm font-normal">
        Deposit your tokens securely to start playing. Your funds are protected
        by smart contracts and you can withdraw anytime. Minimum deposit is 1
        USDT.
      </p>

      <div className="mt-6 w-full">
        <p className="main-text-primary mb-[2px] text-sm font-medium">
          Your Deposit Address
        </p>
        <div className="flex items-center justify-between">
          <div className="main-bg-secondary h-[32px] w-[65%] rounded-md border px-3 py-2 text-base font-normal">
            {truncateAddress(address, width < 390 ? 7 : 10)}
          </div>
          <Button
            onClick={() => copyToClipboardWithCommand(address ?? "")}
            className="h-[32px] !w-[30%]"
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Thêm phần hướng dẫn deposit */}
      <div className="mt-6 w-full">
        <p className="main-text-primary mb-2 text-sm font-medium">
          How to deposit:
        </p>
        <ol className="main-text-secondary list-decimal space-y-2 pl-4 text-sm">
          <li>Copy the deposit address above</li>
          <li>Open your wallet and send USDT to this address</li>
          <li>Wait for network confirmation (usually 1-2 minutes)</li>
          <li>Your balance will be updated automatically</li>
        </ol>
      </div>

      {/* Thêm phần note quan trọng */}
      <div className="mt-6 w-full rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm font-medium text-yellow-800">Important Notes:</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-yellow-700">
          <li>Only send USDT on BNB Chain (BSC)</li>
          <li>Minimum deposit: 1 USDT</li>
          <li>Do not send other tokens to this address</li>
        </ul>
      </div>
    </div>
  );
};

export default Deposit;
