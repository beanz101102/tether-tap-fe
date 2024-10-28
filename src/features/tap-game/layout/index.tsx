"use client";
import { cn } from "@/utils/cn";
import { useGetCurrentUser } from "@/libs/hooks/useGetCurrentUser";
import { useActivePage } from "@/libs/hooks/useActivePage";

const LayoutTapGame = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useGetCurrentUser();
  const isHomePageActive = useActivePage("/");
  return (
    <div className={cn("mx-auto	 h-[100vh] w-full max-w-[500px] bg-white")}>
      <div
        className={cn(
          "hide-scrollbar relative h-full overflow-auto",
          isHomePageActive && "overflow-hidden",
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
