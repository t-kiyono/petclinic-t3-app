import { parse } from "date-fns";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { CommonMeta, Loader, Page } from "~/components/common";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";
import { api } from "~/utils/api";

interface AddPetProps {
  oid: number;
}
const AddPet: NextPage<AddPetProps> = ({ oid }) => {
  const { data: ownerData, isLoading } = api.owners.show.useQuery(oid);
  const { data: typesData } = api.types.list.useQuery();

  const dataRender = () => {
    if (isLoading || !ownerData) return <Loader />;

    const owner = {
      id: ownerData.id,
      name: `${ownerData.first_name ?? ""} ${ownerData.last_name ?? ""}`,
    };
    const types = (typesData ?? []).map(t => ({
      id: t.id,
      name: t.name ?? "",
    }));
    return <AddData owner={owner} petTypes={types} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>New Pet</h2>
      {dataRender()}
    </Page>
  );
};

export default AddPet;

type OwnerInfo = {
  id: number;
  name: string;
}
type PetType = {
  id: number;
  name: string;
}
interface AddDataProps {
  owner: OwnerInfo;
  petTypes: PetType[];
}
function AddData({ owner, petTypes }: AddDataProps) {
  const router = useRouter();
  const mutation = api.pets.create.useMutation();

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
    console.log(data.birthDate);
    mutation.mutate({
      name: data.petName,
      birthDate: parse(data.birthDate, "yyyy-MM-dd", new Date()),
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
          <FormInput id="petName" {...register("petName", {
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
          <FormInput id="birthDate" type="date" {...register("birthDate", {
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
          <select className="h-9" id="petType" {...register("petType", {
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
          <Button type="submit" disabled={isSubmitting}>Add Pet</Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: AddPetProps = {
    oid,
  };
  return { props };
}
