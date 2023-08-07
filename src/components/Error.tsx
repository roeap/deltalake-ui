import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};
