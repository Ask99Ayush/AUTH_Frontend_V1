export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-24"></div>
          <div className="h-3 bg-white/10 rounded w-16"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
      </div>

      {/* Actions skeleton */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <div className="h-9 bg-white/10 rounded-xl w-20"></div>
        <div className="h-4 bg-white/10 rounded w-16"></div>
      </div>

      {/* Comment input skeleton */}
      <div className="pt-4 border-t border-white/10">
        <div className="h-12 bg-white/10 rounded-xl"></div>
      </div>
    </div>
  );
}