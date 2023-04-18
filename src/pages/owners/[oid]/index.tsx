import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { CommonMeta, Loader, Page } from "~/components/common";
import { Button } from "~/components/button";
import { OwnerTable } from "~/components/owner";
import { PetsTable } from "~/components/pet";
import { api } from "~/utils/api";

interface ShowOwnerProps {
  oid: number;
}
const ShowOwner: NextPage<ShowOwnerProps> = ({ oid }) => {
  return (
    <Page>
      <CommonMeta />
      <h2>Owner Information</h2>
      <ShowOwnerData oid={oid} />
    </Page>
  );
};

export default ShowOwner;

interface ShowOwnerDataProps {
  oid: number;
}
function ShowOwnerData({ oid }: ShowOwnerDataProps) {
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

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: ShowOwnerProps = {
    oid,
  };
  return { props };
}
