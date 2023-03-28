import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";
import { Button } from "~/components/button";
import { CommonMeta, Loader, Page } from "~/components/common";
import { api } from "~/utils/api";

interface EditPetProps {
  oid: number;
  pid: number;
}
const EditPet: NextPage<EditPetProps> = ({ oid, pid }) => {
  const { data: ownerData, isLoading: isOwnerLoading } = api.owners.show.useQuery(oid);
  const { data: petData, isLoading: isPetLoading } = api.pets.show.useQuery(pid);
  const { data: typesData } = api.types.list.useQuery();

  const dataRender = () => {
    if (isOwnerLoading || !ownerData) return <Loader />;
    if (isPetLoading || !petData) return <Loader />;

    const owner = {
      id: ownerData.id,
      name: `${ownerData.first_name ?? ""} ${ownerData.last_name ?? ""}`,
    };
    const types = (typesData ?? []).map(t => ({
      id: t.id,
      name: t.name ?? "",
    }));
    const pet = {
      id: petData.id,
      name: petData.name ?? "",
      birthDate: petData.birth_date ?? new Date(),
      typeId: petData.type_id,
    };
    return <EditData owner={owner} petTypes={types} pet={pet} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Pet</h2>
      {dataRender()}
    </Page>
  );
};

export default EditPet;

interface EditDataProps {
  owner: {
    id: number;
    name: string;
  };
  petTypes: {
    id: number;
    name: string;
  }[];
  pet: {
    id: number;
    name: string;
    birthDate: Date;
    typeId: number;
  };
}
function EditData({ owner, petTypes, pet }: EditDataProps) {
  const router = useRouter();
  const mutation = api.pets.update.useMutation();

  type FormValues = {
    petName: string;
    birthDate: string;
    petType: string;
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
      id: pet.id,
      name: data.petName,
      birthDate: new Date(data.birthDate),
      typeId: parseInt(data.petType),
      ownerId: owner.id,
    }, {
      onSuccess: () => router.push(`/owners/${owner.id}`)
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel>owner</FormLabel>
        <FormItem>
          <span className="leading-9">{owner.name}</span>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="petName">Name</FormLabel>
        <FormItem>
          <FormInput id="petName" defaultValue={pet.name} {...register("petName", {
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
          <FormInput id="birthDate" type="date" defaultValue={format(pet.birthDate, "yyyy-MM-dd")} {...register("birthDate", {
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
          <select className="h-9" id="petType" defaultValue={pet.typeId} {...register("petType", {
            required: "This is required",
          })}>
            {
              petTypes.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            }
          </select>
          <FormErrorMessage>
            {errors.petType && (errors.petType.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup reverse>
        <FormItem>
          <Button type="submit" disabled={isSubmitting}>Update Pet</Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const pid = parseInt(params.pid as string);
  const props: EditPetProps = {
    oid,
    pid,
  };
  return { props };
}
