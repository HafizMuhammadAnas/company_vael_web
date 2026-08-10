import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "outline" | "cta";

interface BaseProps {
  variant?: ButtonVariant;
  block?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = BaseProps & { to: string; href?: undefined };

type ButtonAsAnchor = BaseProps & { href: string; to?: undefined };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

function classes(variant: ButtonVariant, block?: boolean, extra?: string) {
  return [styles.btn, styles[variant], block ? styles.block : "", extra ?? ""]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  const { variant = "primary", block, children, className, ...rest } = props;
  const cls = classes(variant, block, className);

  if ("to" in props && props.to !== undefined) {
    const { to } = props as ButtonAsLink;
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href } = props as ButtonAsAnchor;
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
