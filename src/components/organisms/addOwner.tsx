import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { OwnerForm, type OwnerFormValues } from "~/components/molecules/owner";

export function AddOwnerForm() {
  const router = useRouter();
  const mutation = api.owners.create.useMutation();

  const submit = (data: OwnerFormValues) => {
    mutation.mutate(data, {
      onSuccess: data => router.push(`/owners/${data.id}`),
    });
  };

  return <OwnerForm submit={submit} type="ADD" />;
}
