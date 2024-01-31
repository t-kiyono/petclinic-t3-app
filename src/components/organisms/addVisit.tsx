import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { api } from "~/utils/api";
import { Loader } from "~/components/atoms/loader";
import { VisitForm, type VisitFormValues, VisitsTable } from "~/components/molecules/visit";
import { PetTable } from "~/components/molecules/pet";

type Props = {
  pid: number;
};
export function AddVisitData({ pid }: Props) {
  const router = useRouter();
  const mutation = api.visits.create.useMutation();

  const { data: petData, isLoading: isPetLoading } = api.pets.showDetail.useQuery(pid);
  const { data: visitsData, isLoading: isVisitsLoading } = api.visits.listByPetId.useQuery(pid);

  if (isPetLoading || !petData) return <Loader />;
  if (isVisitsLoading || !visitsData) return <Loader />;

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

  const visits = visitsData.map(v => ({
    date: format(v.visit_date ?? new Date(), "yyyy/MM/dd"),
    description: v.description ?? "",
  }));

  const submit = (data: VisitFormValues) => {
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
      <PetTable pet={pet} />
      <VisitForm submit={submit} />
      <b>Previous Visits</b>
      <VisitsTable data={visits} />
    </>
  );
}
