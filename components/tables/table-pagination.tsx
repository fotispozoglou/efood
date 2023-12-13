import { Table } from "@tanstack/react-table";

export type TablePaginationProps< DataType > = {
  table : Table<DataType>
};

export default function TablePagination< DataType >( props : TablePaginationProps< DataType > ) {

  const currentPage = props.table.getState().pagination.pageIndex + 1;
  const totalPages = props.table.getPageCount();

  if ( totalPages <= 1 ) return null;

  return (
    <div className="flex items-center gap-2 sticky bottom-0 bg-white/20 backdrop-blur-md p-2">
      <button
        className="rounded p-1 font-extrabold"
        onClick={() => props.table.setPageIndex(0)}
        disabled={!props.table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="rounded p-1 font-bold"
        onClick={() => props.table.previousPage()}
        disabled={!props.table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <p className="text-center flex-1">Page <strong>{ currentPage } of { totalPages }</strong></p>
      <button
        className="rounded p-1 font-bold"
        onClick={() => props.table.nextPage()}
        disabled={!props.table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        className="rounded p-1 font-extrabold"
        onClick={() => props.table.setPageIndex(totalPages - 1)}
        disabled={!props.table.getCanNextPage()}
      >
        {'>>'}
      </button>
    </div>
  );

};