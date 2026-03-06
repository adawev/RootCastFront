import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", loading = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("ui-button", `ui-button-${variant}`, `ui-button-${size}`, loading && "is-loading", className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <span className="ui-button-spinner" aria-hidden="true" />}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
