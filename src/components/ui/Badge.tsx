import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  let variantClasses = '';
  
  switch (variant) {
    case 'cyan':
      variantClasses = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      break;
    case 'emerald':
      variantClasses = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      break;
    default:
      variantClasses = 'bg-gray-800 text-gray-300 border-gray-700';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses}`}>
      {children}
    </span>
  );
}
