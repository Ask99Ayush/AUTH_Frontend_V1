"use client";

import { AuthProvider } from "./AuthContext";
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(13, 13, 15, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
          },
          className: 'glass-card',
        }}
      />
      {children}
    </AuthProvider>
  );
}