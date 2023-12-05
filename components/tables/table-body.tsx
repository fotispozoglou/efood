import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

export type TableBodyProps< DataType > = {
  table : Table<DataType>;
  data: DataType[];
  columns: ColumnDef<DataType>[];
};

export default function TableBody< DataType >( props : TableBodyProps< DataType > ) {

  return (
    <tbody>
      {props.table.getRowModel().rows.map(row => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => {
              return (
                <td key={cell.id} className="hover:bg-gray-100 hover:cursor-pointer">
                  {
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  }
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  );

};