import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { type ColumnDef, createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { CommonMeta, Loader, Page } from "~/components/common";
import { Table, Tbody, Thead } from "~/components/table";
import { api } from "~/utils/api";

interface ListOwnersProps {
  lastName?: string;
}
const ListOwners: NextPage<ListOwnersProps> = ({ lastName }) => {
  const { data, isLoading } = api.owners.list.useQuery({ lastName: lastName ?? "" });

  const dataRender = () => {
    if (isLoading || !data) return <Loader />;
    const tableData = data.map(d => ({
      id: d.id,
      name: `${d.first_name ?? ""} ${d.last_name ?? ""}`,
      address: d.address ?? "",
      city: d.city ?? "",
      telephone: d.telephone ?? "",
      pets: d.pets.map(p => p.name).join(", "),
    }));
    return <ListData data={tableData} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Owners</h2>
      {dataRender()}
    </Page>
  );
};

export default ListOwners;

type RowData = {
  id: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  pets: string;
}
interface ListDataProps {
  data: RowData[];
}
function ListData({ data }: ListDataProps) {
  const columnHelper = createColumnHelper<RowData>();
  const columns = useMemo<ColumnDef<RowData, string>[]>(() => [
    columnHelper.accessor("name", {
      header: "Name",
      cell: info => (
        <Link href={`/owners/${info.row.original.id}`}>{info.getValue()}</Link>
      ),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("city", {
      header: "City",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("telephone", {
      header: "Telephone",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("pets", {
      header: "Pets",
      cell: info => info.getValue(),
    }),
  ], [columnHelper]);

  const table = useReactTable<RowData>({
    data: data,
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

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const props: ListOwnersProps = {
    lastName: query.lastName as string ?? ""
  };
  return { props };
}
