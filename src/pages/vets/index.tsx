import type { GetServerSidePropsContext, NextPage } from "next";
import type { ComponentProps } from "react";
import { CommonMeta } from "~/components/templates/meta";
import { Dom } from "~/components/pages/vets";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";

type Props = ComponentProps<typeof Dom>;
const Vets: NextPage<Props> = ({ tableData }) => {
  return (
    <>
      <CommonMeta />
      <Dom tableData={tableData} />
    </>
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
