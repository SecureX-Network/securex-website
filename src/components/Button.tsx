import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-securex-600 text-white hover:bg-securex-700 focus-visible:ring-securex-500 shadow-sm',
  secondary: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-500 shadow-sm',
  outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:ring-securex-500',
  ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-securex-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-6 text-base gap-2 rounded-lg',
};

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
    to?: undefined;
  };

export type LinkButtonProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
    to?: undefined;
  };

/** Internal routes use react-router so navigation stays a client-side transition. */
export type RouterLinkButtonProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    to: string;
    href?: undefined;
  };

type CombinedProps = ButtonProps | LinkButtonProps | RouterLinkButtonProps;

export function Button(props: CombinedProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  const baseClasses = [
    'inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className ?? '',
  ].join(' ');

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as RouterLinkButtonProps;
    return (
      <Link to={to} className={baseClasses} {...linkRest}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkButtonProps;
    return (
      <a href={href} className={baseClasses} {...anchorRest}>
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }

  return (
    <button type="button" className={baseClasses} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}