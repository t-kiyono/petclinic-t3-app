import { AddOwnerForm } from "~/components/organisms/addOwner";
import { Layout } from "~/components/templates/layout";

export function Dom() {
  return (
    <Layout>
      <h2>Add Owner</h2>
      <AddOwnerForm />
    </Layout>
  );
}
