import { api } from "~/utils/api";
import { Loader } from "~/components/atoms/loader";
import { OwnersTable } from "~/components/molecules/owner";

type Props = {
  lastName: string;
};
export function OwnersData({ lastName }: Props) {
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
