// 'use client';

// import { cn } from '@/lib/utils';

// export default function Button({ 
//   className, 
//   children, 
//   variant = 'default', 
//   size = 'default',
//   isLoading = false,
//   ...props 
// }) {
//   const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
//   const variantClasses = {
//     default: 'bg-primary text-primary-foreground hover:bg-primary/90',
//     outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
//     secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
//     ghost: 'hover:bg-accent hover:text-accent-foreground',
//   };

//   const sizeClasses = {
//     default: 'h-10 py-2 px-4',
//     sm: 'h-9 px-3 rounded-md',
//     lg: 'h-11 px-8 rounded-md',
//   };

//   return (
//     <button
//       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
//       disabled={isLoading || props.disabled}
//       {...props}
//     >
//       {isLoading && (
//         <span className="mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block"></span>
//       )}
//       {children}
//     </button>
//   );
// }
