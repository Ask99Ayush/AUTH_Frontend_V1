"use client";

import useSWR from "swr";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
import SkeletonLoader from "./SkeletonLoader";
import LoadMoreButton from "./LoadMoreButton";
import NavBar from "./NavBar";

// Dummy data structure matching your API
interface Post {
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
}

export default function FeedPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  // Fetch posts using SWR - matching your existing API call
  const fetcher = (url: string) => api.get(url).then((r) => r.data);
  const { data, error, isLoading } = useSWR(
    token ? "/feed" : null,
    fetcher,
    {
      refreshInterval: 30000, // Keep your existing refresh interval
    }
  );

  // Process data when loaded
  useEffect(() => {
    if (data?.data) {
      const processedPosts = data.data.map((post: any, index: number) => ({
        id: post._id || `post-${index}`,
        title: post.title || "Untitled Post",
        content: post.content || "No content available.",
        author: {
          name: post.author || "Anonymous",
          email: "",
        },
        likes: post.likes || 0,
        comments: post.comments || [],
        createdAt: post.createdAt || new Date().toISOString(),
        isLiked: false, // You might want to get this from your API
      }));
      
      if (page === 1) {
        setAllPosts(processedPosts);
      } else {
        setAllPosts((prev) => [...prev, ...processedPosts]);
      }
    }
  }, [data, page]);

  // Handle post creation
  const handlePostCreated = (newPost: Post) => {
    setAllPosts((prev) => [newPost, ...prev]);
    setIsCreatingPost(false);
  };

  // Handle post like
  const handlePostLike = (postId: string, liked: boolean) => {
    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: liked ? post.likes + 1 : post.likes - 1,
              isLiked: liked,
            }
          : post
      )
    );
  };

  // Handle new comment
  const handleNewComment = (postId: string, comment: string) => {
    const newComment = {
      id: Date.now().toString(),
      text: comment,
      author: { name: user?.name || "You" },
    };

    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post
      )
    );
  };

  // Handle load more
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-black"></div>
        <div className="relative w-full max-w-md">
          <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">CF</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Redirecting to Login</h2>
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Matching login page background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-black"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-2xl">
        {/* Main container matching login card style */}
        <div className="glass-card rounded-2xl border border-white/10 shadow-2xl shadow-black/30 overflow-hidden">
          
          {/* Header matching login page */}
          <div className="p-8 border-b border-white/10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CF</span>
                </div>
                <h1 className="text-3xl font-bold text-white">
                  Tine<span className="text-gradient">Flow</span>
                </h1>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Feed</h2>
              <p className="text-gray-400">
                Welcome back, {user?.name?.split(" ")[0] || "there"}
              </p>
            </div>
            
            {/* Create Post Button - Centered like login form */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsCreatingPost(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Post
              </button>
            </div>
          </div>

          {/* Create Post Modal */}
          {isCreatingPost && (
            <div className="p-8 border-b border-white/10">
              <CreatePostCard 
                onPostCreated={handlePostCreated}
                onCancel={() => setIsCreatingPost(false)}
              />
            </div>
          )}

          {/* Error State - Matching login error style */}
          {error && (
            <div className="p-6 border-b border-white/10">
              <div className="bg-red-900/30 text-red-300 border border-red-700/50 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Failed to load feed: {error?.message || "Please try again later"}
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm rounded-lg transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && page === 1 && (
            <div className="p-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          )}

          {/* Empty State - Matching login card style */}
          {!isLoading && !error && allPosts.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No posts yet</h3>
              <p className="text-gray-400 mb-6">
                Be the first to share something with your team!
              </p>
              <button
                onClick={() => setIsCreatingPost(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-primary transition-all duration-300"
              >
                Create First Post
              </button>
            </div>
          )}

          {/* Posts List */}
          {allPosts.length > 0 && (
            <div className="divide-y divide-white/10">
              {allPosts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-white/5 transition-colors">
                  <PostCard
                    post={post}
                    onLike={handlePostLike}
                    onComment={handleNewComment}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Load More Button - Centered like login button */}
          {data?.hasMore && allPosts.length > 0 && (
            <div className="p-6 border-t border-white/10 text-center">
              <LoadMoreButton
                isLoading={isLoading && page > 1}
                onClick={handleLoadMore}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}