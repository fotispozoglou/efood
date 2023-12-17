"use client";

import { Prisma } from '@prisma/client';
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  TableOptions,
} from '@tanstack/react-table';
import React from 'react';
import TableHead from './table-head';
import TableBody from './table-body';
import TablePagination from './table-pagination';

export type TableProps< DataType > = {
  data : DataType[];
  columns: ColumnDef<DataType>[];
  options?: Partial<TableOptions<DataType>>;
};

export default function Table< DataType >({
  data,
  columns,
  options
}: TableProps< DataType >) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
    ...options,
  });

  return (
    <div className="p-2 relative">
      <table className='w-full'>
        <TableHead table={ table } />
        <TableBody data={ data } columns={ columns } table={ table } />
      </table>
      <TablePagination table={ table } />
    </div>
  );

};