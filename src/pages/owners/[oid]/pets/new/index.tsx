import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { CommonMeta, Loader, Page } from "~/components/common";
import { PetForm, type PetFormValues } from "~/components/pet";
import { api } from "~/utils/api";

interface AddPetProps {
  oid: number;
}
const AddPet: NextPage<AddPetProps> = ({ oid }) => {
  return (
    <Page>
      <CommonMeta />
      <h2>New Pet</h2>
      <AddPetData oid={oid} />
    </Page>
  );
};

export default AddPet;

interface AddPetDataProps {
  oid: number;
}
function AddPetData({ oid }: AddPetDataProps) {
  const router = useRouter();
  const mutation = api.pets.create.useMutation();

  const { data: ownerData, isLoading } = api.owners.show.useQuery(oid);
  const { data: typesData } = api.types.list.useQuery();

  if (isLoading || !ownerData) return <Loader />;

  const ownerName = `${ownerData.first_name ?? ""} ${ownerData.last_name ?? ""}`;
  const types = (typesData ?? []).map(t => ({
    id: t.id,
    name: t.name ?? "",
  }));

  const submit = (data: PetFormValues) => {
    mutation.mutate({
      name: data.petName,
      birthDate: new Date(data.birthDate),
      typeId: parseInt(data.petTypeId),
      ownerId: oid,
    }, {
      onSuccess: () => router.push(`/owners/${oid}`)
    });
  };

  return <PetForm ownerName={ownerName} petTypes={types} submit={submit} type="ADD" />;
}

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: AddPetProps = {
    oid,
  };
  return { props };
}
