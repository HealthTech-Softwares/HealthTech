import { useState } from "react";

export const usePagination = (data, itemsPerPage) => {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < data.length) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) setPage(page - 1);
  };

  return { currentData, page, setPage, endIndex, handleNextPage, handlePreviousPage };
};
