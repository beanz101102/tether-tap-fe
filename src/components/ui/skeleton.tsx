import {cn} from "@/utils/cn";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-md bg-slate-300 dark:bg-zinc-600', className)} {...props} />;
}

export { Skeleton };
