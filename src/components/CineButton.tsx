import React from 'react';

interface CineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export default function CineButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: CineButtonProps) {
  const baseClasses = 'rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-red-700 text-white hover:from-red-700 hover:to-primary hover:shadow-lg hover:shadow-primary/20',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/20',
    accent: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20',
    ghost: 'glass-card text-white hover:bg-white/10 border border-white/10',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      )}
      {children}
    </button>
  );
}