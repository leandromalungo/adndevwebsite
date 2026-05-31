import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-2xl border border-violet-500/10 overflow-hidden bg-white shadow-lg",
        className
      )}
      aria-hidden
    >
      <Skeleton className="h-44 sm:h-48 w-full rounded-none" />
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-auto pt-3 border-t border-gray-100">
          <Skeleton className="h-9 w-full rounded-lg" />
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
