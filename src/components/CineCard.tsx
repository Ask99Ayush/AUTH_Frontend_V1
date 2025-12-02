import React from 'react';

interface CineCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'accent';
  hoverable?: boolean;
}

export default function CineCard({ 
  children, 
  className = '', 
  gradient = 'primary',
  hoverable = true 
}: CineCardProps) {
  const gradientClasses = {
    primary: 'hover:border-primary/50',
    secondary: 'hover:border-purple-500/50',
    accent: 'hover:border-cyan-500/50',
  };

  const glowClasses = {
    primary: 'group-hover:shadow-primary/10',
    secondary: 'group-hover:shadow-purple-500/10',
    accent: 'group-hover:shadow-cyan-500/10',
  };

  return (
    <div className={`relative group ${hoverable ? 'hover-lift' : ''}`}>
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        gradient === 'primary' ? 'from-primary/10 to-transparent' :
        gradient === 'secondary' ? 'from-purple-500/10 to-transparent' :
        'from-cyan-500/10 to-transparent'
      } rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
      
      {/* Main card */}
      <div className={`
        relative glass-card rounded-2xl p-6
        border border-white/10
        transition-all duration-300
        ${hoverable ? gradientClasses[gradient] : ''}
        ${hoverable ? `hover:shadow-2xl ${glowClasses[gradient]}` : ''}
        ${className}
      `}>
        {children}
      </div>
    </div>
  );
}