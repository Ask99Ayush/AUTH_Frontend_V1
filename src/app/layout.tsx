import "./styles/globals.css";
import Providers from "../context/Providers";
import Navbar from "../components/Navbar";
import { headers } from "next/headers";

export const metadata = {
  title: "CineFlow | Premium Task Management",
  description: "Cinematic, team collaboration platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Check if we're on the feed page
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isFeedPage = pathname.includes("/feed");

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <Providers>
          {/* Animated background gradient */}
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-background to-black opacity-80 -z-10" />
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent -z-10" />
          
          <div className="min-h-screen flex flex-col relative">
            {/* Only show cinematic navbar if NOT on feed page */}
            {!isFeedPage && <Navbar />}
            
            {/* Main Content with cinematic container */}
            <main className="flex-1 px-4 md:px-8 py-6">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
            
            {/* Only show cinematic footer if NOT on feed page */}
            {!isFeedPage && (
              <footer className="mt-auto py-8 px-4 border-t border-white/10 bg-gradient-to-t from-black/50 to-transparent">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold font-netflix tracking-wider text-gradient">
                        TineFlow
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Cinematic collaboration for modern teams
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Privacy</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Terms</a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Contact</a>
                    </div>
                  </div>
                  <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t border-white/5">
                    © 2025 TineFlow. All rights reserved.
                  </div>
                </div>
              </footer>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}