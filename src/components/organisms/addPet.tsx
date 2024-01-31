import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { Loader } from "~/components/atoms/loader";
import { PetForm, type PetFormValues } from "~/components/molecules/pet";

type Props = {
  oid: number;
};
export function AddPetData({ oid }: Props) {
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
