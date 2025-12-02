// src/api/posts.ts

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// Mock database (temporary, for frontend/demo purposes)
let postsDB: Post[] = [
  { id: "1", title: "Welcome Post", content: "Hello world!", author: "Admin", createdAt: new Date().toISOString() },
];

// Fetch all posts
export const getPosts = async (): Promise<Post[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...postsDB].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Add a new post
export const createPost = async (title: string, content: string, author: string): Promise<Post> => {
  const newPost: Post = {
    id: (postsDB.length + 1).toString(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  };
  postsDB.unshift(newPost); // Add to the top
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return newPost;
};
