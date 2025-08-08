const ErrorMessage = ({ 
  message = 'An error occurred', 
  onRetry, 
  showRetry = false,
  type = 'error' 
}) => {
  const typeClasses = {
    error: 'error-message',
    warning: 'warning-message',
    info: 'info-message'
  };

  return (
    <div className={`message-container ${typeClasses[type]}`}>
      <div className="message-content">
        <p className="message-text">{message}</p>
        {showRetry && onRetry && (
          <button 
            onClick={onRetry}
            className="retry-button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
