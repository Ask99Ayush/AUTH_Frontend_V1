"use client";

import { useState } from "react";

interface CommentPreviewProps {
  comments: Array<{
    id: string;
    text: string;
    author: {
      name: string;
    };
  }>;
}

export default function CommentPreview({ comments }: CommentPreviewProps) {
  const [expanded, setExpanded] = useState(false);
  const previewComments = expanded ? comments : comments.slice(0, 3);

  return (
    <div className="space-y-3">
      {previewComments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <div className="w-7 h-7 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-full flex-shrink-0 mt-1"></div>
          <div className="flex-1">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="font-medium text-sm text-white mb-1">
                {comment.author.name}
              </p>
              <p className="text-gray-300 text-sm">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}

      {comments.length > 3 && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-sm text-primary hover:text-red-400 font-medium transition-colors"
        >
          View all {comments.length} comments
        </button>
      )}

      {expanded && comments.length > 3 && (
        <button
          onClick={() => setExpanded(false)}
          className="text-sm text-gray-400 hover:text-gray-300 font-medium transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  );
}