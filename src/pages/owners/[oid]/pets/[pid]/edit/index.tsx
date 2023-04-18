import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CommonMeta, Loader, Page } from "~/components/common";
import { PetForm, type PetFormValues } from "~/components/pet";
import { api } from "~/utils/api";

interface EditPetProps {
  oid: number;
  pid: number;
}
const EditPet: NextPage<EditPetProps> = ({ oid, pid }) => {
  return (
    <Page>
      <CommonMeta />
      <h2>Pet</h2>
      <EditPetData oid={oid} pid={pid} />
    </Page>
  );
};

export default EditPet;

interface EditPetDataProps {
  oid: number;
  pid: number;
}
function EditPetData({ oid, pid }: EditPetDataProps) {
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

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const pid = parseInt(params.pid as string);
  const props: EditPetProps = {
    oid,
    pid,
  };
  return { props };
}
