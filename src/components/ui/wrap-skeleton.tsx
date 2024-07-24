import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/utils/cn";


const WrapSkeleton = ({
  children,
  className,
  isSkeleton,
  classNameContainer,
}: {
  children: React.ReactNode;
  className?: string;
  isSkeleton: boolean;
  classNameContainer?: string;
}) => {
  if (isSkeleton) {
    return (
      <div className={classNameContainer}>
        <Skeleton className={cn('w-20 h-8', className)} />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default WrapSkeleton;
