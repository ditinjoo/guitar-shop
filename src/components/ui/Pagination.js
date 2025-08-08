import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  showInfo = true 
}) => {
  // Calculate pagination info inline
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-new">
      {showInfo && (
        <div className="pagination-info">
          Showing {startItem}-{endItem} of {totalItems}
        </div>
      )}
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
        >
          ← Previous
        </button>

        {generatePageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`pagination-btn ${pageNum === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum + 1}
          </button>
        ))}

        {totalPages > 6 && currentPage < totalPages - 3 && (
          <span className="pagination-dots">...</span>
        )}

        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
