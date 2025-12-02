interface LoadMoreButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export default function LoadMoreButton({ isLoading, onClick }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Loading more posts...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Load More Posts
        </>
      )}
    </button>
  );
}