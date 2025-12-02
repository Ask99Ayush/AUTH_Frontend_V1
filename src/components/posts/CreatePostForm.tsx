"use client";

import React, { useState } from "react";

export default function CreatePostForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Post submitted: ${content}`);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        className="p-3 rounded-lg bg-gray-900 text-white resize-none"
      />
      <button
        type="submit"
        className="self-end px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Post
      </button>
    </form>
  );
}
