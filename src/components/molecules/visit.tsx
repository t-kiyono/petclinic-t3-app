import { format } from "date-fns";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { type ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "~/components/atoms/button";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/atoms/form";
import { Table, Tbody } from "~/components/atoms/table";

/**
 * VisitForm
 */
export type VisitFormValues = {
  visitDate: string;
  description: string;
};
type VisitFormProps = {
  submit: (data: VisitFormValues) => void;
};
export function VisitForm({ submit }: VisitFormProps) {
  const {
    handleSubmit,
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VisitFormValues>({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel htmlFor="visitDate">Date</FormLabel>
        <FormItem>
          <FormInput id="visitDate" type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} {...register("visitDate", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.visitDate && (errors.visitDate.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormItem>
          <FormInput id="description" {...register("description", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.description && (errors.description.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup reverse>
        <FormItem>
          <Button type="submit" disabled={isSubmitting}>Add Visit</Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

/**
 * VisitsTable
 */
export type VisitRowData = {
  date: string;
  description: string;
};
type VisitsTableProps = {
  data: VisitRowData[];
};
export function VisitsTable({ data }: VisitsTableProps) {
  const columnHelper = createColumnHelper<VisitRowData>();
  const columns = useMemo<ColumnDef<VisitRowData, string>[]>(() => [
    columnHelper.accessor("date", {
      header: "Date",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: info => info.getValue(),
    }),
  ], [columnHelper]);

  const table = useReactTable<VisitRowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <Tbody>
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
