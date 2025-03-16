import { cn } from "@/lib/utils";
import { CaretDown, CaretLeft, CaretLineLeft, CaretLineRight, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Select } from "antd";
import { useEffect, useMemo, useState } from "react";

interface PaginationProps {
  page?: number;
  perPage?: number;
  total?: number;
  onChange?: (page: number, perPage: number) => void;
}

const availableOptions = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
];

const Pagination: React.FC<PaginationProps> = ({
  page = 1,
  perPage = 10,
  total = 0,
  onChange
}) => {
  const [localPage, setLocalPage] = useState<number>(page);
  const [localPerPage, setLocalPerPage] = useState<number>(perPage);
  const totalPages = total > 0 ? Math.ceil(total / localPerPage) : 1;

  useEffect(() => {
    setLocalPage(page);
  }, [page]);

  useEffect(() => {
    setLocalPerPage(perPage);
  }, [perPage]);

  const handlePerPageChange = (value: number) => {
    setLocalPerPage(value);
    if (onChange) {
      onChange(localPage, value);
    }
  }

  const pageItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [];
    let startPage = Math.max(2, localPage - 1);
    let endPage = Math.min(totalPages - 1, localPage + 1);

    // Adjust the start and end for edge cases
    if (localPage <= 3) {
      endPage = 5;
    } else if (localPage >= totalPages - 2) {
      startPage = totalPages - 4;
    }

    // Always show the first page
    pages.push(1);

    // Show ellipsis if startPage is greater than 2
    if (startPage > 2) {
      pages.push("...");
    }

    // Push the visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Show ellipsis if endPage is less than totalPages - 1
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show the last page
    pages.push(totalPages);

    return pages;
  }, [localPage, totalPages]);

  const firstPageClick = () => {
    setLocalPage(1);
    if (onChange) {
      onChange(1, localPerPage);
    }
  }

  const lastPageClick = () => {
    setLocalPage(totalPages);
    if (onChange) {
      onChange(totalPages, localPerPage);
    }
  }

  const prevPageClick = () => {
    if (localPage > 1) {
      setLocalPage(localPage - 1);
      if (onChange) {
        onChange(localPage - 1, localPerPage);
      }
    }
  }

  const nextPageClick = () => {
    if (localPage < totalPages) {
      setLocalPage(localPage + 1);
      if (onChange) {
        onChange(localPage + 1, localPerPage);
      }
    }
  }

  const handlePaginationItemClick = (clickedPage: number) => {
    setLocalPage(clickedPage)
    if (onChange) {
      onChange(clickedPage, localPerPage);
    }
  }

  if (!total) {
    return <></>;
  }


  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-2">
      {/* Page Filter */}
      <div className="flex items-center gap-3">
        <Select
          size="large"
          value={localPerPage}
          variant="filled"
          style={{ flex: 1 }}
          options={availableOptions}
          onChange={handlePerPageChange}
          suffixIcon={(
            <CaretDown size={12} weight="bold" />
          )}
        />
        <p className="text-zinc-500 text-base">
          of {total}
        </p>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center gap-x-3 w-full md:w-fit">
        <div className="flex gap-x-3">
          <button className="w-10 h-10 flex flex-col justify-center items-center rounded-xl bg-white hover:bg-zinc-100 text-zinc-500 shadow-md" onClick={() => firstPageClick()}>
            <CaretLineLeft size={12} weight="bold" />
          </button>
          <button className="w-10 h-10 flex flex-col justify-center items-center rounded-xl bg-white hover:bg-zinc-100 text-zinc-500 shadow-md" onClick={() => prevPageClick()}>
            <CaretLeft size={12} weight="bold" />
          </button>
        </div>
        <div className="flex gap-x-3">
          <p className="block md:hidden text-zinc-500">{localPage} of {totalPages}</p>
          <div className="hidden md:flex gap-x-3">
            {pageItems?.map((item, index) => {
              return (
                <button
                  key={index}
                  className={cn(
                    'w-10 h-10 text-sm font-medium flex flex-col justify-center items-center rounded-xl shadow-md bg-white',
                    localPage === item && 'bg-gradient-primary-1 text-primary-foreground cursor-default',
                    localPage !== item && item === '...' && 'text-zinc-500 cursor-not-allowed',
                    localPage !== item && item !== '...' && 'text-primary hover:bg-zinc-100 cursor-pointer',
                  )}
                  onClick={() => typeof item === 'number' ? handlePaginationItemClick(item) : {}}
                  disabled={typeof item !== 'number'}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex gap-x-3">
          <button className="w-10 h-10 flex flex-col justify-center items-center rounded-xl bg-white hover:bg-zinc-100 text-zinc-500 shadow-md" onClick={() => nextPageClick()}>
            <CaretRight size={12} weight="bold" />
          </button>
          <button className="w-10 h-10 flex flex-col justify-center items-center rounded-xl bg-white hover:bg-zinc-100 text-zinc-500 shadow-md" onClick={() => lastPageClick()}>
            <CaretLineRight size={12} weight="bold" />
          </button>
        </div>
      </div >
    </div>
  )
}

export default Pagination;