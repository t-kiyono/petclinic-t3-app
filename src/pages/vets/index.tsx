import type { GetServerSidePropsContext, NextPage } from "next";
import { appRouter } from "~/server/api/root";
import { CommonMeta, Page } from "~/components/common";
import { VetsTable } from "~/components/vets";
import { createInnerTRPCContext } from "~/server/api/trpc";

type Props = {
  tableData: Array<{
    name: string;
    specialties: string;
  }>
}
const Vets: NextPage<Props> = ({ tableData }) => {
  return (
    <Page>
      <CommonMeta />
      <h2>Veterinarians</h2>
      <VetsTable data={tableData} />
    </Page>
  );
};

export default Vets;

export async function getServerSideProps(_ctx: GetServerSidePropsContext) {
  const trpc = appRouter.createCaller(createInnerTRPCContext({}));
  const data = await trpc.vets.list();

  return {
    props: {
      tableData: data.map(d => ({
        name: `${d.first_name ?? ""} ${d.last_name ?? ""}`,
        specialties: d.vet_specialties.map(vs => vs.specialties.name ?? "").join(" ")
      }))
    }
  };
}
