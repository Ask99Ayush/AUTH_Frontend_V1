"use client";

import { useState } from "react";
import LikeButton from "./LikeButton";
import CommentPreview from "./CommentPreview";


interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      email: string;
    };
    likes: number;
    comments: Array<{
      id: string;
      text: string;
      author: {
        name: string;
      };
    }>;
    createdAt: string;
    isLiked: boolean;
  };
  onLike: (postId: string, liked: boolean) => void;
  onComment: (postId: string, comment: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onComment(post.id, comment);
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4">
      {/* Post Header - Matching login card spacing */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-700 rounded-full flex items-center justify-center text-white font-medium">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-medium text-white">{post.author.name}</h4>
            <p className="text-sm text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>

      {/* Like Button */}
      <div className="flex items-center gap-4">
        <LikeButton
          postId={post.id}
          initialLikes={post.likes}
          initialLiked={post.isLiked}
          onLike={onLike}
        />
        <div className="text-sm text-gray-400">
          {post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Comments Preview */}
      {post.comments.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <CommentPreview comments={post.comments} />
        </div>
      )}

      {/* Add Comment Form - Matching login input style */}
      <form onSubmit={handleSubmitComment} className="pt-4 border-t border-white/10">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="px-6 py-3 bg-primary hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}