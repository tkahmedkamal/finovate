import { forwardRef, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("font-normal leading-normal", {
  variants: {
    variant: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
      body1: "text-base",
      body2: "text-sm",
      body3: "text-xs",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      muted: "text-muted-foreground",
    },
    weight: {
      default: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    leading: {
      default: "leading-normal",
      tight: "leading-tight",
      loose: "leading-loose",
    },
    gutterBottom: {
      true: "mb-2",
      false: "mb-0",
    },
    defaultVariants: {
      variant: "body1",
      color: "default",
      weight: "default",
      align: "left",
      leading: "default",
      gutterBottom: true,
    },
  },
});

export interface TypographyProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  color?: "default" | "primary" | "muted";
  weight?: "default" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  leading?: "default" | "tight" | "loose";
  asChild?: boolean;
}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    {
      variant,
      as,
      color,
      weight,
      align,
      leading,
      gutterBottom,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : as || "p";

    return (
      <Comp
        className={cn(
          typographyVariants({
            variant,
            color,
            weight,
            align,
            leading,
            gutterBottom,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
