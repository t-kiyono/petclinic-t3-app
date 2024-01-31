import type { NextPage } from "next";
import { CommonMeta } from "~/components/templates/meta"; 
import { Dom } from "~/components/pages/owners/find";

const FindOwners: NextPage = () => {
  return (
    <>
      <CommonMeta />
      <Dom />
    </>
  );
};
export default FindOwners;
