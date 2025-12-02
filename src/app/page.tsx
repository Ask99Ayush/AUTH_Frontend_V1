import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 -z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="text-center">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-8 animate-pulse-glow">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">NOW IN BETA</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold font-netflix tracking-tight mb-6">
              <span className="text-gradient">Cinematic</span> Collaboration
              <br />
              <span className="text-white">For Modern Teams</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Experience task management reimagined with, 
              cinematic visuals, and premium workflows that elevate your team's productivity.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-primary to-red-700 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link 
                href="/login"
                className="px-8 py-4 glass-card text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                Sign In
              </Link>
            </div>
            
            {/* Features preview */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Cinematic UI", desc: "Netflix-inspired interface", icon: "🎬" },
                { title: "Real-time Sync", desc: "Instant collaboration", icon: "⚡" },
                { title: "Premium Security", desc: "Enterprise-grade protection", icon: "🛡️" },
              ].map((feature) => (
                <div 
                  key={feature.title}
                  className="glass-card p-6 rounded-xl hover-lift group hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience the Premium Difference</h2>
            <p className="text-gray-400 text-lg">See how TineFlow transforms your workflow</p>
          </div>
          
          {/* Demo cards - Netflix style */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Visual Task Boards</h3>
                    <p className="text-gray-400">Drag, drop, and conquer</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Immersive kanban boards with smooth animations and cinematic transitions that make project management feel like an experience.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative glass-card rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Real-time Analytics</h3>
                    <p className="text-gray-400">Insights that inspire action</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Beautiful data visualizations with glowing charts and interactive dashboards that tell the story of your team's progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}