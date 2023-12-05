import { flexRender, Table } from "@tanstack/react-table";

export type TableHeadProps< DataType > = {
  table : Table<DataType>
};

export default function TableHead< DataType >( props : TableHeadProps< DataType > ) {

  return (
    <thead>
      {props.table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            return (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null} */}
                  </div>
                )}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  );

};