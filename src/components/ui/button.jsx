import React from 'react';

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-500',
    ghost: 'text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500',
    link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500'
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 py-1 text-xs',
    lg: 'h-12 px-6 py-3 text-base',
    xl: 'h-14 px-8 py-4 text-lg',
  };
  
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };