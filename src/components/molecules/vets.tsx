import { useMemo } from "react";
import { type ColumnDef, createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, Tbody, Thead } from "~/components/atoms/table";

/**
 * VetsTable
 */
export type VetsRowData = {
  name: string;
  specialties: string;
};
type VetsTableProps = {
  data: VetsRowData[];
};
export function VetsTable({ data }: VetsTableProps) {
  const columnHelper = createColumnHelper<VetsRowData>();
  const columns = useMemo<ColumnDef<VetsRowData, string>[]>(() => [
    columnHelper.accessor("name", {
      header: "Name",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("specialties", {
      header: "Specialties",
      cell: info => info.getValue().length > 0 ? info.getValue() : "none",
    }),
  ], [columnHelper]);

  const table = useReactTable<VetsRowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </Tbody>
    </Table>
  );
}
