import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { type ColumnDef, createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { pets } from "@prisma/client";
import { CommonMeta, Loader, Page } from "~/components/common";
import { Table, Tbody, Thead } from "~/components/table";
import { api } from "~/utils/api";

interface ListOwnersProps {
  lastName?: string;
}
const ListOwners: NextPage = ({ lastName }: ListOwnersProps) => {
  return (
    <Page>
      <CommonMeta />
      <h2>Owners</h2>
      <ListData lastName={lastName ?? ""} />
    </Page>
  );
};

export default ListOwners;

interface ListDataProps {
  lastName: string;
}
function ListData({ lastName }: ListDataProps) {
  const { data, isLoading } = api.owners.list.useQuery({ lastName });
  type Owner = Exclude<typeof data, undefined>[number];
  const columnHelper = createColumnHelper<Owner>();
  const columns = useMemo<ColumnDef<Owner, any>[]>(() => [
    columnHelper.accessor<"name", string>("name", {
      header: "Name",
      cell: info => (
        <Link href={`/owners/${info.row.original.id}`}>{info.getValue()}</Link>
      ),
    }),
    columnHelper.accessor<"address", string>("address", {
      header: "Address",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor<"city", string>("city", {
      header: "City",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor<"telephone", string>("telephone", {
      header: "Telephone",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor<"pets", pets[]>("pets", {
      header: "Pets",
      cell: info => info.getValue().map(p => p.name).join(", "),
    }),
  ], [columnHelper]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading || !data) return <Loader />;

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
