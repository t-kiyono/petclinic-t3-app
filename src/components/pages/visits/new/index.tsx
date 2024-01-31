import { AddVisitData } from "~/components/organisms/addVisit";
import { Layout } from "~/components/templates/layout";

type Props = {
  pid: number;
};
export function Dom({ pid }: Props) {
  return (
    <Layout>
      <h2>New Visit</h2>
      <AddVisitData pid={pid} />
    </Layout>
  );
}
