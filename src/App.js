import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Components
import { GuitarList, GuitarModels, GuitarModelDetails } from './components';
import Footer from './footer';
import { LoadingSpinner, ErrorMessage } from './components';

// Constants
import { ROUTES } from './constants';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <ErrorMessage
    message={`Something went wrong: ${error.message}`}
    onRetry={resetErrorBoundary}
    showRetry={true}
    type="error"
  />
);

// App Component
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="app">
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<GuitarList />} />
                <Route path={ROUTES.BRAND_MODELS} element={<GuitarModels />} />
                <Route path={ROUTES.MODEL_DETAILS} element={<GuitarModelDetails />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
