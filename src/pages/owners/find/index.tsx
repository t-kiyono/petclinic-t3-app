import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { CommonMeta, Page } from "~/components/common";
import { FindOwnersForm, type FindOwnersFormValues } from "~/components/owner";
import { Button } from "~/components/button";

const FindOwners: NextPage = () => {
  return (
    <Page>
      <CommonMeta />
      <h2>Find Owners</h2>
      <FindOwnersData />
    </Page>
  );
};

export default FindOwners;

function FindOwnersData() {
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
