import React from "react";
import {Link} from "react-router";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: null, errorInfo: null};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }

    handleReload = () => {
        this.setState({hasError: false, error: null, errorInfo: null});
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-page">
                    <div className="error-boundary-content">
                        <div className="error-icon">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <h1>Oops! Something went wrong</h1>
                        <p>
                            We encountered an unexpected error. Don't worry, our team has been notified.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>Error Details (Development Only)</summary>
                                <pre>
                                    <code>
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </code>
                                </pre>
                            </details>
                        )}
                        <div className="error-actions">
                            <button onClick={this.handleReload} className="btn-reload">
                                <i className="fas fa-redo"></i> Reload Page
                            </button>
                            <Link to="/" className="btn-home-error">
                                <i className="fas fa-home"></i> Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
