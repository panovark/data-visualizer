import { Component, type ErrorInfo, type ReactNode } from "react";

type FallbackRender = (props: { reset: () => void }) => ReactNode;

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | FallbackRender;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (typeof fallback === "function") {
        return fallback({ reset: this.handleReset });
      }

      if (fallback) {
        return fallback;
      }

      return (
        <div
          role="alert"
          className="bg-destructive/10 text-destructive flex flex-col items-center gap-3 rounded-xl border border-destructive/40 p-6 text-center"
        >
          <p className="text-lg font-semibold">Ooops! Something went wrong.</p>
          <p className="text-sm text-destructive/70">
            Try to refresh the page.
          </p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
