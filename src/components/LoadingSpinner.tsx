export default function LoadingSpinner({ size = "medium", text = "Loading..." }: { size?: "small" | "medium" | "large", text?: string }) {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-primary to-cyan-500 opacity-20"></div>
        {/* Spinner */}
        <div className={`${sizeClasses[size]} border-white/30 border-t-white rounded-full animate-spin`}></div>
      </div>
      {text && <p className="text-gray-400 text-sm animate-pulse">{text}</p>}
    </div>
  );
}