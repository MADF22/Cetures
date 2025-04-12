import * as React from "react";

const VisuallyHidden = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        margin: "-1px",
        padding: "0",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        border: "0",
      }}
      {...props}>
      {children}
    </span>
  );
};

export default VisuallyHidden;
