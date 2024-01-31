import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { api } from "~/utils/api";
import { Button } from "~/components/atoms/button";
import { Loader } from "~/components/atoms/loader";
import { OwnerTable } from "~/components/molecules/owner";
import { PetsTable } from "~/components/molecules/pet";

type Props = {
  oid: number;
};
export function ShowOwnerData({ oid }: Props) {
  const router = useRouter();
  const { data, isLoading } = api.owners.showDetail.useQuery(oid);

  if (isLoading || !data) return <Loader />;

  const ownerData = {
    id: data.id,
    name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
    address: data.address ?? "",
    city: data.city ?? "",
    telephone: data.telephone ?? "",
  };
  const petsData = data.pets.map(p => ({
    id: p.id,
    ownerId: oid,
    name: p.name ?? "",
    birthDate: format(p.birth_date ?? new Date(), "yyyy-MM-dd"),
    type: p.types.name ?? "",
    visits: p.visits.map(v => ({
      id: v.id,
      visitDate: format(v.visit_date ?? new Date(), "yyyy-MM-dd"),
      description: v.description ?? "",
    })),
  }));

  return (
    <>
      <OwnerTable owner={ownerData} />
      <Button onClick={() => router.push(`/owners/${oid}/edit`)}>Edit Owner</Button>
      <div className="ml-1 inline-block">
        <Button onClick={() => router.push(`/owners/${oid}/pets/new`)}>Add New Pet</Button>
      </div>
      <div className="mt-10">
        <h2>Pets and Visits</h2>
        <PetsTable data={petsData} />
      </div>
    </>
  );
}
