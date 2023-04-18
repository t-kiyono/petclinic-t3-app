import Link from "next/link";
import { useMemo } from "react";
import { type ColumnDef, createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, Tbody, Thead } from "~/components/table";
import { useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";

/**
 * FindOwnersForm
 */
export interface FindOwnersFormValues {
  lastName: string;
}
interface FindOwnersFormProps {
  submit: (data: FindOwnersFormValues) => void;
}
export function FindOwnersForm({ submit }: FindOwnersFormProps) {
  const {
    register,
    handleSubmit
  } = useForm<FindOwnersFormValues>();

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel htmlFor="lastName">Last name</FormLabel>
        <FormItem>
          <FormInput size={30} maxLength={80} {...register("lastName") } />
        </FormItem>
      </FormGroup>
      <FormGroup reverse>
        <FormItem>
          <Button type="submit">Find Owner</Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

/**
 * OwnersTable
 */
export interface OwnerRowData {
  id: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  pets: string;
}
interface OwnersTableProps {
  data: OwnerRowData[];
}
export function OwnersTable({ data }: OwnersTableProps) {
  const columnHelper = createColumnHelper<OwnerRowData>();
  const columns = useMemo<ColumnDef<OwnerRowData, string>[]>(() => [
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

  const table = useReactTable<OwnerRowData>({
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

/**
 * OwnerForm
 */
export interface OwnerFormValues {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
}

interface OwnerFormProps {
  owner?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
  }
  submit: (data: OwnerFormValues) => void;
  type: "ADD" | "UPDATE";
}
export function OwnerForm({ owner, submit, type }: OwnerFormProps) {
  const ownerValue = owner ?? {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    telephone: "",
  };

  const {
    handleSubmit,
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<OwnerFormValues>({
    mode: "onChange",
  });

  let buttonLabel = "";
  switch (type) {
  case "ADD":
    buttonLabel = "Add Owner";
    break;
  case "UPDATE":
    buttonLabel = "Update Owner";
    break;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <FormItem>
          <FormInput id="firstName" defaultValue={ownerValue.firstName} {...register("firstName", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.firstName && (errors.firstName.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <FormItem>
          <FormInput id="lastName" defaultValue={ownerValue.lastName} {...register("lastName", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.lastName && (errors.lastName.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="address">Address</FormLabel>
        <FormItem>
          <FormInput id="address" defaultValue={ownerValue.address} {...register("address", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.address && (errors.address.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="city">City</FormLabel>
        <FormItem>
          <FormInput id="city" defaultValue={ownerValue.city} {...register("city", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.city && (errors.city.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="telephone">Telephone</FormLabel>
        <FormItem>
          <FormInput id="telephone" defaultValue={ownerValue.telephone} {...register("telephone", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.telephone && (errors.telephone.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup reverse>
        <FormItem>
          <Button type="submit" disabled={isSubmitting}>
            {buttonLabel}
          </Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

/**
 * OwnerTable
 */
interface OwnerTableProps {
  owner: {
    id: number;
    name: string;
    address: string;
    city: string;
    telephone: string;
  };
}
export function OwnerTable({ owner }: OwnerTableProps) {
  return (
    <Table>
      <Tbody>
        <tr>
          <th>Name</th>
          <td>
            <strong>{owner.name}</strong>
          </td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{owner.address}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>{owner.city}</td>
        </tr>
        <tr>
          <th>Telephone</th>
          <td>{owner.telephone}</td>
        </tr>
      </Tbody>
    </Table>
  );
}
