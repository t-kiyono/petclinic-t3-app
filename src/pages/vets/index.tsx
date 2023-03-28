import type { NextPage } from "next";
import { useMemo } from "react";
import { type ColumnDef, createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { CommonMeta, Loader, Page } from "~/components/common";
import { Table, Tbody, Thead } from "~/components/table";
import { api } from "~/utils/api";

const Vets: NextPage = () => {
  const { data, isLoading } = api.vets.list.useQuery();

  const listRender = () => {
    if (isLoading || !data) return <Loader />;

    const vets = data.map(d => ({
      name: `${d.first_name ?? ""} ${d.last_name ?? ""}`,
      specialties: d.vet_specialties.map(vs => vs.specialties.name ?? ""),
    }));

    return <ListData vets={vets} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Veterinarians</h2>
      {listRender()}
    </Page>
  );
};

export default Vets;

interface ListDataProps {
  vets: {
    name: string;
    specialties: string[];
  }[];
}
function ListData({ vets }: ListDataProps) {
  type RowData = {
    name: string;
    specialties: string;
  }

  const columnHelper = createColumnHelper<RowData>();
  const columns = useMemo<ColumnDef<RowData, string>[]>(() => [
    columnHelper.accessor("name", {
      header: "Name",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("specialties", {
      header: "Specialties",
      cell: info => info.getValue(),
    }),
  ], [columnHelper]);

  const tableData: RowData[] = vets.map(v => ({
    name: v.name,
    specialties: v.specialties.length > 0 ? v.specialties.join(" ") : "none",
  }));

  const table = useReactTable<RowData>({
    data: tableData,
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
