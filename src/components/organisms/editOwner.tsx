import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { Loader } from "~/components/atoms/loader";
import { OwnerForm, type OwnerFormValues } from "~/components/molecules/owner";

type Props = {
  oid: number;
};
export function EditOwnerForm({ oid }: Props) {
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
