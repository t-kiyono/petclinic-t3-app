import { OwnersData } from "~/components/organisms/listOwners";
import { Layout } from "~/components/templates/layout";

type Props = {
  lastName?: string;
};
export function Dom({ lastName }: Props) {
  return (
    <Layout>
      <h2>Owners</h2>
      <OwnersData lastName={lastName ?? ""} />
    </Layout>
  );
}
