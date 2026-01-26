import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'soft' | 'elevated';
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...rest
}: CardProps) {
  const variants = {
    default: 'card',
    soft: 'card-soft',
    elevated: 'card shadow-large',
  };

  const hoverClass = hover ? 'hover:-translate-y-1 hover:shadow-large' : '';

  return (
    <div className={`${variants[variant]} ${hoverClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
