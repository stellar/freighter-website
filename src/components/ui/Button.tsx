import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "pill" | "pill-dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-[0_0_20px_rgba(101,76,216,0.25)] hover:shadow-[0_0_30px_rgba(101,76,216,0.35)] hover:brightness-110 rounded-lg",
  secondary:
    "text-text-primary hover:bg-bg-hover rounded-lg",
  ghost: "text-text-secondary hover:text-text-primary rounded-lg",
  pill: "bg-bg-hover text-text-primary hover:bg-zinc-700 rounded-full",
  "pill-dark":
    "bg-bg-tertiary text-white hover:bg-bg-hover rounded-full",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className,
  icon,
  iconRight,
}: ButtonProps) {
  const isPill = variant === "pill" || variant === "pill-dark";
  const classes = clsx(
    "inline-flex items-center justify-center gap-1 font-medium transition-all duration-200 cursor-pointer",
    isPill ? "" : sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
