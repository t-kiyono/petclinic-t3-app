import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { CommonMeta, Page } from "~/components/common";
import { OwnerForm, type OwnerFormValues } from "~/components/owner";
import { api } from "~/utils/api";

const AddOwner: NextPage = () => {
  return (
    <Page>
      <CommonMeta />
      <h2>Add Owner</h2>
      <AddForm />
    </Page>
  );
};

export default AddOwner;

function AddForm() {
  const router = useRouter();
  const mutation = api.owners.create.useMutation();

  const submit = (data: OwnerFormValues) => {
    mutation.mutate(data, {
      onSuccess: data => router.push(`/owners/${data.id}`),
    });
  };

  return <OwnerForm submit={submit} type="ADD" />;
}
