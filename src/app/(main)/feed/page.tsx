"use client";

import useSWR from "swr";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CineCard from "../../../components/CineCard";

export default function FeedPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token]);

  const fetcher = (url: string) => api.get(url).then((r) => r.data);
  const { data, error, isLoading } = useSWR(token ? "/feed" : null, fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  if (!token)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner text="Redirecting to login..." />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CineCard gradient="primary" className="max-w-lg">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Failed to Load Feed</h3>
            <p className="text-gray-400 mb-4">We couldn't retrieve your feed at this time.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-primary to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-primary transition-all"
            >
              Try Again
            </button>
          </div>
        </CineCard>
      </div>
    );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" text="Loading your cinematic feed..." />
          <p className="text-gray-500 text-sm mt-4">Preparing your premium experience</p>
        </div>
      </div>
    );

  const posts = data?.data || [];
  const filteredPosts = posts.filter((post: any) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get user's first name for personalization
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen py-8">
      {/* Hero Header */}
      <div className="mb-10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold font-netflix mb-3">
            Welcome back, <span className="text-gradient">{firstName}</span>
          </h1>
          <p className="text-xl text-gray-400">
            Your cinematic workspace awaits
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <CineCard gradient="primary" hoverable={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Posts</p>
              <p className="text-3xl font-bold mt-2">{posts.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-red-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </CineCard>

        <CineCard gradient="accent" hoverable={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Now</p>
              <p className="text-3xl font-bold mt-2">24</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </CineCard>

        <CineCard gradient="secondary" hoverable={false}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Week</p>
              <p className="text-3xl font-bold mt-2">+12%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </CineCard>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
        <div className="flex-1 w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Search posts..."
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-red-700 text-white rounded-xl font-medium hover:from-red-700 hover:to-primary transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <CineCard className="max-w-2xl mx-auto">
          <div className="text-center p-10">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">No posts found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? "No posts match your search. Try a different term." 
                : "When posts are created, they'll appear here in cinematic style."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 transition-all"
              >
                Clear Search
              </button>
            )}
          </div>
        </CineCard>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: any, index: number) => (
            <CineCard 
              key={post._id} 
              gradient={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
            >
              <div className="flex flex-col h-full">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        index % 3 === 0 ? 'bg-primary/20 text-primary' :
                        index % 3 === 1 ? 'bg-purple-500/20 text-purple-500' :
                        'bg-cyan-500/20 text-cyan-500'
                      }`}>
                        {post.author?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{post.author || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    index % 3 === 0 ? 'bg-primary/10 text-primary' :
                    index % 3 === 1 ? 'bg-purple-500/10 text-purple-500' :
                    'bg-cyan-500/10 text-cyan-500'
                  }`}>
                    {post.category || 'General'}
                  </div>
                </div>

                {/* Post Content */}
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title || 'Untitled Post'}
                </h3>
                <p className="text-gray-400 flex-grow line-clamp-4 mb-6">
                  {post.content || 'No content available.'}
                </p>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      {post.likes || 0}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments || 0}
                    </button>
                  </div>
                  <button className="text-sm text-primary hover:text-red-400 transition-colors font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </CineCard>
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 glass-card rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 mx-auto">
            Load More Posts
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}