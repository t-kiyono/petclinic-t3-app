import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { CommonMeta, Loader, Page } from "~/components/common";
import { Table, Tbody } from "~/components/table";
import { Button } from "~/components/button";
import { api } from "~/utils/api";

interface ShowOwnerProps {
  oid: number;
}
const ShowOwner: NextPage<ShowOwnerProps> = ({ oid }) => {
  const router = useRouter();
  const { data, isLoading } = api.owners.showDetail.useQuery(oid);

  const ownerRender = () => {
    if (isLoading || !data) return <Loader />;

    const owner = {
      id: data.id,
      name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
      address: data.address ?? "",
      city: data.city ?? "",
      telephone: data.telephone ?? "",
    };

    return <OwnerInfo owner={owner} />;
  };

  const petsRender = () => {
    if (isLoading || !data) return <Loader />;

    const pets = data.pets.map(p => ({
      id: p.id,
      ownerId: oid,
      name: p.name ?? "",
      birthDate: p.birth_date ?? new Date(),
      type: p.types.name ?? "",
      visits: p.visits.map(v => ({
        id: v.id,
        visitDate: v.visit_date ?? new Date(),
        description: v.description ?? "",
      })),
    }));

    return <PetsInfo pets={pets} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Owner Information</h2>
      {ownerRender()}
      <Button onClick={() => router.push(`/owners/${oid}/edit`)}>Edit Owner</Button>
      <div className="ml-1 inline-block">
        <Button onClick={() => router.push(`/owners/${oid}/pets/new`)}>Add New Pet</Button>
      </div>
      <div className="mt-10">
        <h2>Pets and Visits</h2>
        {petsRender()}
      </div>
    </Page>
  );
};

export default ShowOwner;

interface OwnerInfoProps {
  owner: {
    id: number;
    name: string;
    address: string;
    city: string;
    telephone: string;
  };
}
function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <Table>
      <Tbody>
        <tr>
          <th>Name</th>
          <td>
            <strong>{owner.name}</strong>
          </td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{owner.address}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>{owner.city}</td>
        </tr>
        <tr>
          <th>Telephone</th>
          <td>{owner.telephone}</td>
        </tr>
      </Tbody>
    </Table>
  );
}

interface PetsInfoProps {
  pets: {
    id: number;
    ownerId: number;
    name: string;
    birthDate: Date;
    type: string;
    visits: {
      id: number;
      visitDate: Date;
      description: string;
    }[];
  }[];
}
function PetsInfo({ pets }: PetsInfoProps) {
  return (
    <Table>
      <Tbody>
        { pets.map(pet => (
          <tr key={pet.id}>
            <th scope="col">
              <dl className="mt-0 mb-5">
                <dt className="w-40 text-right overflow-hidden text-ellipsis whitespace-nowrap font-bold float-left clear-left leading-normal">
                  Name
                </dt>
                <dd className="ml-44 leading-normal">
                  {pet.name}
                </dd>
              </dl>
              <dl className="mt-0 mb-5">
                <dt className="w-40 text-right overflow-hidden text-ellipsis whitespace-nowrap font-bold float-left clear-left leading-normal">
                  Birth Date
                </dt>
                <dd className="ml-44 leading-normal">
                  {format(pet.birthDate, "yyyy-MM-dd")}
                </dd>
              </dl>
              <dl className="mt-0 mb-5">
                <dt className="w-40 text-right overflow-hidden text-ellipsis whitespace-nowrap font-bold float-left clear-left leading-normal">
                  Type
                </dt>
                <dd className="ml-44 leading-normal">
                  {pet.type}
                </dd>
              </dl>
            </th>
            <td>
              <table className="bg-transparent">
                <thead>
                  <tr>
                    <th className="text-left p-1">
                      Visit Date
                    </th>
                    <th className="text-left p-1">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pet.visits.map(visit => (
                    <tr key={visit.id}>
                      <td className="p-1">
                        {format(visit.visitDate, "yyyy-MM-dd")}
                      </td>
                      <td className="p-1">
                        {visit.description}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-1">
                      <Link href={`/owners/${pet.ownerId}/pets/${pet.id}/edit`}>Edit Pet</Link>
                    </td>
                    <td className="p-1">
                      <Link href={`/owners/${pet.ownerId}/pets/${pet.id}/visits/new`}>Add Visit</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </Tbody>
    </Table>
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
