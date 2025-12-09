import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.07] ${className}`}>
       <div className={`relative z-10 ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
      {/* Subtle shine effect */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 transition-all duration-500 group-hover:animate-shine" />
    </div>
  );
};
