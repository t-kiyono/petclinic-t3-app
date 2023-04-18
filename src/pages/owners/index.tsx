import type { GetServerSidePropsContext, NextPage } from "next";
import { CommonMeta, Loader, Page } from "~/components/common";
import { OwnersTable } from "~/components/owner";
import { api } from "~/utils/api";

interface ListOwnersProps {
  lastName?: string;
}
const ListOwners: NextPage<ListOwnersProps> = ({ lastName }) => {
  return (
    <Page>
      <CommonMeta />
      <h2>Owners</h2>
      <OwnersData lastName={lastName ?? ""} />
    </Page>
  );
};

export default ListOwners;

interface OwnersDataProps {
  lastName: string;
}
function OwnersData({ lastName }: OwnersDataProps) {
  const { data, isLoading } = api.owners.list.useQuery({ lastName });

  if (isLoading || !data) return <Loader />;

  const tableData = data.map(d => ({
    id: d.id,
    name: `${d.first_name ?? ""} ${d.last_name ?? ""}`,
    address: d.address ?? "",
    city: d.city ?? "",
    telephone: d.telephone ?? "",
    pets: d.pets.map(p => p.name ?? "").join(", "),
  }));

  return <OwnersTable data={tableData} />;
}


export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const props: ListOwnersProps = {
    lastName: query.lastName as string ?? ""
  };
  return { props };
}
