"use client";

import { useState } from "react";

interface CreatePostCardProps {
  onPostCreated: (post: any) => void;
  onCancel: () => void;
}

export default function CreatePostCard({ onPostCreated, onCancel }: CreatePostCardProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call - you would replace this with your actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        author: {
          name: "You", // This would come from your auth context
          email: "",
        },
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        isLiked: false,
      };

      onPostCreated(newPost);
      setTitle("");
      setContent("");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Create a Post</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input - Matching login input style */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your post about?"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Content Input - Matching login input style */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
            disabled={isSubmitting}
          />
        </div>

        {/* Error Message - Matching login error style */}
        {error && (
          <div className="bg-red-900/30 text-red-300 border border-red-700/50 px-4 py-3 rounded-xl text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Buttons - Matching login button style */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="px-6 py-3 bg-gradient-to-r from-primary to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Posting...
              </>
            ) : (
              "Share Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}