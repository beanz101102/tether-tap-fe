import { useTelegram } from "@/libs/telegram/hooks/useTelegram";
import { DialogContentProps } from "@radix-ui/react-dialog";
import { Dispatch, FC, SetStateAction, useEffect, useMemo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { cn } from "@/utils/cn";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { useWindowSize } from "@/features/tap-game/hooks/useWindowSize";

export interface ShadModalProps extends DialogContentProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
  overlayClassName?: string;
  hideClose?: boolean;
  closeButtonClassName?: string;
  styleOverLay?: React.CSSProperties;
  isDrawer?: boolean;
}

const ShadModal: FC<ShadModalProps> = ({
  isDrawer = true,
  children,
  trigger,
  header,
  footer,
  isOpen,
  onOpen,
  className,
  overlayClassName,
  hideClose,
  styleOverLay,
  closeButtonClassName,
  ...props
}) => {
  const { isMobile } = useWindowSize();
  const isHFull = className?.includes("h-full");
  const isTelegram = useTelegram();

  useEffect(() => {
    // When modal is open, scroll to bottom a bit to avoid logic scrollTop equal 0 make modal not scroll top able
    if (isTelegram && isOpen) {
      const scrollableEl = document.querySelector(".hide-scrollbar");
      scrollableEl && scrollableEl.scrollBy(0, 10);
    }
  }, [isTelegram, isOpen]);

  if (isMobile && isDrawer)
    return (
      <Drawer
        open={isMobile && isOpen}
        onOpenChange={isMobile ? onOpen : () => {}}
      >
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent
          className={cn(
            "main-bg-secondary main-text-primary rounded-0 mx-auto w-full rounded-t-2xl border-0 p-4",
            className,
            isHFull ? "max-h-[97vh]" : "max-h-[90vh]",
            isTelegram ? "!h-auto" : "",
          )}
        >
          {header && (
            <DrawerHeader>
              <DrawerTitle>{header}</DrawerTitle>
            </DrawerHeader>
          )}
          <div className="hide-scrollbar fix-scroll-bar h-full overflow-y-scroll">
            {children}
          </div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );

  if (isMobile && isDrawer)
    return (
      <Drawer
        open={isMobile && isOpen}
        onOpenChange={isMobile ? onOpen : () => {}}
      >
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent
          className={cn(
            "main-bg-secondary main-text-primary rounded-0 mx-auto w-full rounded-t-2xl border-0 p-4",
            className,
            isHFull ? "max-h-[97vh]" : "max-h-[90vh]",
            isTelegram ? "!h-auto" : "",
          )}
        >
          {header && (
            <DrawerHeader>
              <DrawerTitle>{header}</DrawerTitle>
            </DrawerHeader>
          )}
          <div className="hide-scrollbar h-full overflow-y-scroll">
            {children}
          </div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog
      open={(!isMobile || !isDrawer) && isOpen}
      onOpenChange={!isMobile || !isDrawer ? onOpen : () => {}}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "main-bg-secondary main-text-primary rounded-lg pb-8",
          className,
        )}
        overlayClassName={overlayClassName}
        hideClose={hideClose}
        styleOverLay={styleOverLay}
        closeButtonClassName={closeButtonClassName}
        {...props}
      >
        {header && (
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default ShadModal;
