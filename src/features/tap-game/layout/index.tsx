"use client";
import { cn } from "@/utils/cn";
import {useGetCurrentUser} from "@/libs/hooks/useGetCurrentUser";

const LayoutTapGame = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useGetCurrentUser();
  return (
    <div className={cn("mx-auto	 h-[100vh] w-full max-w-[500px] bg-black")}>
      <div
        className={cn(
          "hide-scrollbar relative h-full overflow-auto",
        )}
        style={{
          maxHeight: currentUser ? "calc(100vh - 82px)" : "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutTapGame;
