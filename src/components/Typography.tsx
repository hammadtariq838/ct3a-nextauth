import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function P({ children, className }: TypographyProps) {
  return <p className={cn("leading-7", className)}>{children}</p>;
}

export function Blockquote({ children, className }: TypographyProps) {
  return <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>{children}</blockquote>;
}

export function Code({ children, className }: TypographyProps) {
  return <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}>{children}</code>;
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}  

export function Large({ children, className }: TypographyProps) {
    return (
      <p className={cn("text-lg font-semibold", className)}>{children}</p>
    );
  }

  export function Small({ children, className }: TypographyProps) {
    return (
      <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>
    );
  } 

  export function Muted({ children, className }: TypographyProps) {
    return (
      <p className={cn("text-secondary font-normal", className)}>{children}</p>
    );
  } 

  