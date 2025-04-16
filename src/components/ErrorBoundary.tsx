// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error in component:', error);
    console.error('Error details:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize this fallback UI
      return <h1>Something went wrong with the Navbar. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
