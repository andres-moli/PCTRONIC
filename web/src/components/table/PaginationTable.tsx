import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MetadataPagination } from "../../domain/graphql";

interface PaginationTableProps {
  metadata: MetadataPagination;
  valueSkip: number;
  setSkip: (skip: number) => void;
  valueTake: number;
  setTake: (take: number) => void;
  className?: string;
}

const itemsPerPageOptions = [5, 10, 20, 50, 100];

export const PaginationTable = ({
  metadata,
  valueSkip,
  setSkip,
  valueTake,
  setTake,
  className = "",
}: PaginationTableProps) => {
  const totalItems = metadata.totalItems ?? 0;
  const totalPages = Math.ceil(totalItems / valueTake);
  const currentPage = Math.floor(valueSkip / valueTake) + 1;

  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newSkip = (page - 1) * valueTake;
      setSkip(newSkip);
    }
  };

  const handleInputBlur = () => {
    const page = parseInt(inputPage);
    if (!isNaN(page)) {
      handlePageChange(Math.min(Math.max(1, page), totalPages));
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const getPageRange = () => {
    const range: number[] = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className={`ml-4 mr-4 mx-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {(currentPage - 1) * valueTake + 1} -{" "}
        {Math.min(currentPage * valueTake, totalItems)} de {totalItems} items
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Items por página:</span>
          <select
            value={valueTake}
            onChange={(e) => {
              const newTake = Number(e.target.value);
              setTake(newTake);
              setSkip(0); // Reiniciar paginación al cambiar el tamaño
            }}
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Input móvil */}
          <div className="flex items-center gap-1 sm:hidden">
            <input
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={handleInputBlur}
              onKeyPress={handleInputKeyPress}
              min="1"
              max={totalPages}
              className="w-16 rounded-md border border-gray-300 bg-white px-3 py-1 text-center text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">/ {totalPages}</span>
          </div>

          {/* Botones escritorio */}
          <div className="hidden items-center gap-1 sm:flex">
            {getPageRange().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-600 dark:text-gray-400">...</span>
            )}
            {totalPages > 5 && currentPage < totalPages - 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`h-8 w-8 rounded-md text-sm ${
                  currentPage === totalPages
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
