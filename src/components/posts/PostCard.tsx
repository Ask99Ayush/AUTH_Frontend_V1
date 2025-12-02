"use client";

import React from "react";
import { Post } from "@/api/posts";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md space-y-2">
      <h3 className="text-white font-semibold">{post.title}</h3>
      <p className="text-gray-300">{post.content}</p>
      <span className="text-gray-500 text-sm">By {post.author}</span>
    </div>
  );
}
