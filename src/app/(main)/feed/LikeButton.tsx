"use client";

import { useState } from "react";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  initialLiked: boolean;
  onLike: (postId: string, liked: boolean) => void;
}

export default function LikeButton({
  postId,
  initialLikes,
  initialLiked,
  onLike,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (isAnimating) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes(newLikedState ? likes + 1 : likes - 1);
    setIsAnimating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      onLike(postId, newLikedState);
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState);
      setLikes(newLikedState ? likes : likes + 1);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isAnimating}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
        isLiked
          ? "bg-red-900/20 text-red-400"
          : "bg-white/5 text-gray-400 hover:bg-white/10"
      }`}
    >
      <div className="relative">
        {isAnimating && (
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
        )}
        <svg
          className={`w-5 h-5 transition-transform ${isLiked ? "fill-current" : ""}`}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <span className="font-medium">{likes}</span>
    </button>
  );
}