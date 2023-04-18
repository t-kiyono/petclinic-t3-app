import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { CommonMeta, Loader, Page } from "~/components/common";
import { OwnerForm, type OwnerFormValues } from "~/components/owner";
import { api } from "~/utils/api";

interface EditOwnerProps {
  oid: number;
}
const EditOwner: NextPage<EditOwnerProps> = ({ oid }) => {
  return (
    <Page>
      <CommonMeta />
      <h2>Owner</h2>
      <EditForm oid={oid} />
    </Page>
  );
};

export default EditOwner;

interface EditFormProps {
  oid: number;
}
function EditForm({ oid }: EditFormProps) {
  const router = useRouter();
  const mutation = api.owners.update.useMutation();
  const { data, isLoading } = api.owners.show.useQuery(oid);
  const ctx = api.useContext();

  if (isLoading || !data) return <Loader />;

  const owner = {
    id: data.id,
    firstName: data.first_name ?? "",
    lastName: data.last_name ?? "",
    address: data.address ?? "",
    city: data.city ?? "",
    telephone: data.telephone ?? "",
  };

  const submit = (data: OwnerFormValues) => {
    mutation.mutate({ ...data, id: oid }, {
      onSuccess: data => {
        void (async () => {
          await ctx.owners.show.invalidate(oid);
        })();
        router.push(`/owners/${data.id}`);
      },
    });
  };

  return <OwnerForm owner={owner} submit={submit} type="UPDATE" />;
}

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: EditOwnerProps = {
    oid,
  };
  return { props };
}
