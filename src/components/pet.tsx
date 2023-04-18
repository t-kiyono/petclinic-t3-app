import { format } from "date-fns";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "./button";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel, FormSelect } from "./form";
import { Table, Tbody, Thead } from "./table";

/**
 * PetsTable
 */
interface PetsTableProps {
  data: {
    id: number;
    ownerId: number;
    name: string;
    birthDate: string;
    type: string;
    visits: {
      id: number;
      visitDate: string;
      description: string;
    }[];
  }[];
}
export function PetsTable({ data }: PetsTableProps) {
  return (
    <Table>
      <Tbody>
        { data.map(pet => (
          <tr key={pet.id}>
            <th scope="col">
              <dl className="mt-0 mb-5">
                <dt className="w-40 text-right overflow-hidden text-ellipsis whitespace-nowrap font-bold float-left clear-left leading-normal">
                  Name
                </dt>
                <dd className="ml-44 leading-normal">
                  {pet.name}
                </dd>
              </dl>
              <dl className="mt-0 mb-5">
                <dt className="w-40 text-right overflow-hidden text-ellipsis whitespace-nowrap font-bold float-left clear-left leading-normal">
                  Birth Date
                </dt>
                <dd className="ml-44 leading-normal">
                  {pet.birthDate}
                </dd>
              </dl>
              <dl className="mt-0 mb-5">
                <dt className="w-40 text-right overflow-hidden text-ellipsis whitespace-nowrap font-bold float-left clear-left leading-normal">
                  Type
                </dt>
                <dd className="ml-44 leading-normal">
                  {pet.type}
                </dd>
              </dl>
            </th>
            <td>
              <table className="bg-transparent">
                <thead>
                  <tr>
                    <th className="text-left p-1">
                      Visit Date
                    </th>
                    <th className="text-left p-1">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pet.visits.map(visit => (
                    <tr key={visit.id}>
                      <td className="p-1">
                        {visit.visitDate}
                      </td>
                      <td className="p-1">
                        {visit.description}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-1">
                      <Link href={`/owners/${pet.ownerId}/pets/${pet.id}/edit`}>Edit Pet</Link>
                    </td>
                    <td className="p-1">
                      <Link href={`/owners/${pet.ownerId}/pets/${pet.id}/visits/new`}>Add Visit</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </Tbody>
    </Table>
  );
}

/**
 * PetForm
 */
export interface PetFormValues {
  petName: string;
  birthDate: string;
  petTypeId: string;
}
interface PetFormProps {
  ownerName: string;
  petTypes: {
    id: number;
    name: string;
  }[];
  pet?: {
    petName: string;
    birthDate: string;
    petTypeId: string;
  };
  submit: (data: PetFormValues) => void;
  type: "ADD" | "UPDATE";
}
export function PetForm({ ownerName, petTypes, pet, submit, type }: PetFormProps) {
  const petValue = pet ?? {
    petName: "",
    birthDate: "",
    petTypeId: "",
  };

  const {
    handleSubmit,
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PetFormValues>({
    mode: "onChange",
  });

  let buttonLabel = "";
  switch (type) {
  case "ADD":
    buttonLabel = "Add Pet";
    break;
  case "UPDATE":
    buttonLabel = "Update Pet";
    break;
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel>owner</FormLabel>
        <FormItem>
          <span className="leading-9">{ownerName}</span>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="petName">Name</FormLabel>
        <FormItem>
          <FormInput id="petName" defaultValue={petValue.petName} {...register("petName", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.petName && (errors.petName.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
        <FormItem>
          <FormInput id="birthDate" type="date" defaultValue={petValue.birthDate} {...register("birthDate", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.birthDate && (errors.birthDate.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="petType">Type</FormLabel>
        <FormItem>
          <FormSelect id="petType" defaultValue={petValue.petTypeId} {...register("petTypeId", {
            required: "This is required",
          })}>
            {
              petTypes.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            }
          </FormSelect>
          <FormErrorMessage>
            {errors.petTypeId && (errors.petTypeId.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup reverse>
        <FormItem>
          <Button type="submit" disabled={isSubmitting}>{buttonLabel}</Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

/**
 * PetTable
 */
interface PetTableProps {
  pet: {
    id: number;
    name: string;
    birthDate: Date;
    type: string;
    owner: {
      name: string;
      id: number;
    };
  }
}
export function PetTable({ pet }: PetTableProps) {
  return (
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
  );
}
