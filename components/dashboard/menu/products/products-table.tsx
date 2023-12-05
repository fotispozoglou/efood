"use client";

import DebouncedInput from "@/components/inputs/debounced-input";
import Table from "@/components/tables/table";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ProductsTableItem from "./products-table-item";

export type ProductsTableProps = {
  products: Prisma.ProductGetPayload<{}>[];
};

const columns : ColumnDef< Prisma.ProductGetPayload<{}> >[] = [
  {
    header: '',
    footer: props => props.column.id,
    accessorKey: 'name',
    accessorFn: row => `${row.name} ${row.price}`,
    cell: info => <ProductsTableItem data={ info.row.original } />,
  },
];

export default function ProductsTable({ products }: ProductsTableProps) {

  const [ filter, setFilter ] = useState('');

  const handleFilterChange = ( value : string | number ) => {

    setFilter( String(value) );

  };

  return (
    <div className="flex flex-col w-full">
      <DebouncedInput
        value=""
        onChange={ handleFilterChange }
        className="p-2 outline-none bg-gray-50 border rounded-md"
      />
      <Table
        data={ products }
        columns={ columns }
        options={{
          state: {
            globalFilter: filter,
          },
          initialState: {
            pagination: {
              pageSize: 40
            }
          },
          onGlobalFilterChange: setFilter
        }}
      />
    </div>
  );

};