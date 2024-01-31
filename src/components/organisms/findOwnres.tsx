import { useRouter } from "next/navigation";
import { Button } from "~/components/atoms/button";
import { FindOwnersForm, type FindOwnersFormValues } from "~/components/molecules/owner";

export function FindOwnersData() {
  const router = useRouter();

  const submit = (data: FindOwnersFormValues) => {
    router.push(`/owners?lastName=${data.lastName}`);
  };

  return (
    <>
      <FindOwnersForm submit={submit} />
      <br />
      <Button onClick={() => router.push("/owners/new")}>Add Owner</Button>
    </>
  );
}
