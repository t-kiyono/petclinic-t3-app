import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";
import { Button } from "~/components/button";
import { CommonMeta, Loader, Page } from "~/components/common";
import { Table, Tbody, Thead } from "~/components/table";
import { type ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

interface AddVisitProps {
  pid: number;
}
const AddVisit: NextPage<AddVisitProps> = ({ pid }) => {
  const { data: petData, isLoading: isPetLoading } = api.pets.showDetail.useQuery(pid);
  const { data: visitsData, isLoading: isVisitsLoading } = api.visits.listByPetId.useQuery(pid);

  const addDataRender = () => {
    if (isPetLoading || !petData) return <Loader />;

    const pet = {
      id: petData.id,
      name: petData.name ?? "",
      birthDate: petData.birth_date ?? new Date(),
      type: petData.types.name ?? "",
      owner: {
        name: `${petData.owners.first_name ?? ""} ${petData.owners.last_name ?? ""}`,
        id: petData.owners.id,
      },
    };
    return <AddData pet={pet} />;
  };

  const previousDataRender = () => {
    if (isVisitsLoading || !visitsData) return <Loader />;

    const visits = visitsData.map(v => ({
      date: v.visit_date ?? new Date(),
      description: v.description ?? "",
    }));
    return <PreviousVisits visits={visits} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>New Visit</h2>
      {addDataRender()}
      {previousDataRender()}
    </Page>
  );
};

export default AddVisit;

type PetInfo = {
  id: number;
  name: string;
  birthDate: Date;
  type: string;
  owner: {
    name: string;
    id: number;
  };
}
interface AddDataProps {
  pet: PetInfo;
}
function AddData({ pet }: AddDataProps) {
  const router = useRouter();
  const mutation = api.visits.create.useMutation();

  type FormValues = {
    visitDate: string;
    description: string;
  }
  const {
    handleSubmit,
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const submit = (data: FormValues) => {
    mutation.mutate({
      visitDate: new Date(data.visitDate),
      description: data.description,
      petId: pet.id,
    }, {
      onSuccess: () => router.push(`/owners/${pet.owner.id}`)
    });
  };

  return (
    <>
      <b>Pet</b>
      <Table>
        <Thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </Thead>
        <Tbody>
          <tr>
            <td>{pet.name}</td>
            <td>{format(pet.birthDate, "yyyy/MM/dd")}</td>
            <td>{pet.type}</td>
            <td>{pet.owner.name}</td>
          </tr>
        </Tbody>
      </Table>
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
    </>
  );
}

interface PreviousVisitsProps {
  visits: {
    date: Date;
    description: string;
  }[];
}
function PreviousVisits({ visits }: PreviousVisitsProps) {
  type RowData = {
    date: string;
    description: string;
  }
  const columnHelper = createColumnHelper<RowData>();
  const columns = useMemo<ColumnDef<RowData, string>[]>(() => [
    columnHelper.accessor("date", {
      header: "Date",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: info => info.getValue(),
    }),
  ], [columnHelper]);

  const tableData: RowData[] = visits.map(v => ({
    date: format(v.date, "yyyy/MM/dd"),
    description: v.description
  }));

  const table = useReactTable<RowData>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <b>Previous Visits</b>
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
    </>
  );
}

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const pid = parseInt(params.pid as string);
  const props: AddVisitProps = {
    pid,
  };
  return { props };
}
