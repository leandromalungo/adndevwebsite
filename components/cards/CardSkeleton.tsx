import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full h-56 sm:h-60 rounded-xl overflow-hidden bg-gray-200 animate-pulse flex flex-col justify-between p-3 sm:p-3.5",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full bg-gray-300" />
        <Skeleton className="h-4 w-16 rounded-full bg-gray-300" />
      </div>
      <div className="mt-auto flex flex-col gap-1.5">
        <Skeleton className="h-4.5 w-4/5 rounded bg-gray-300" />
        <Skeleton className="h-3 w-11/12 rounded bg-gray-300" />
        <div className="flex items-center justify-between pt-1.5 border-t border-gray-300/40">
          <Skeleton className="h-4 w-24 rounded bg-gray-300" />
          <Skeleton className="h-6 w-16 rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

const DEFAULT_GRID =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

interface CardGridSkeletonProps {
  count?: number;
  className?: string;
}

export function CardGridSkeleton({
  count = 8,
  className = DEFAULT_GRID,
}: CardGridSkeletonProps) {
  return (
    <div className={className} aria-busy="true" aria-label="A carregar conteúdo">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
