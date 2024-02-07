import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
