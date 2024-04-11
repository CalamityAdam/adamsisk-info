import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactElement;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // might want to log the error and info somewhere
    logErrorToMyService(error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function logErrorToMyService(
  error: Error,
  componentStack: string | null | undefined
): void {
  // TODO: Implement error logging logic? ...probably not. maybe a simple webhook?
  console.error('oopsie!', error, componentStack);
}

export default ErrorBoundary;
