import React, { useState } from "react";

const ProductPagination = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page's products
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
     

      {/* Pagination controls */}
      <div className="pagination">
        <h2>Hello World</h2>
      </div>
    </div>
  );
};

export default ProductPagination;
