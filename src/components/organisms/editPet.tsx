import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { api } from "~/utils/api";
import { Loader } from "~/components/atoms/loader";
import { PetForm, type PetFormValues } from "~/components/molecules/pet";

type Props = {
  oid: number;
  pid: number;
};
export function EditPetData({ oid, pid }: Props) {
  const router = useRouter();
  const mutation = api.pets.update.useMutation();
  const ctx = api.useContext();

  const { data: ownerData, isLoading: isOwnerLoading } = api.owners.show.useQuery(oid);
  const { data: petData, isLoading: isPetLoading } = api.pets.show.useQuery(pid);
  const { data: typesData } = api.types.list.useQuery();

  if (isOwnerLoading || !ownerData) return <Loader />;
  if (isPetLoading || !petData) return <Loader />;

  const ownerName = `${ownerData.first_name ?? ""} ${ownerData.last_name ?? ""}`;
  const types = (typesData ?? []).map(t => ({
    id: t.id,
    name: t.name ?? "",
  }));
  const pet = {
    petName: petData.name ?? "",
    birthDate: format(petData.birth_date ?? new Date(), "yyyy-MM-dd"),
    petTypeId: String(petData.type_id),
  };

  const submit = (data: PetFormValues) => {
    mutation.mutate({
      id: pid,
      name: data.petName,
      birthDate: new Date(data.birthDate),
      typeId: parseInt(data.petTypeId),
      ownerId: oid,
    }, {
      onSuccess: () => {
        void (async () => {
          await ctx.pets.show.invalidate(pid);
        })();
        router.push(`/owners/${oid}`);
      },
    });
  };

  return <PetForm ownerName={ownerName} petTypes={types} pet={pet} submit={submit} type="UPDATE" />;
}
