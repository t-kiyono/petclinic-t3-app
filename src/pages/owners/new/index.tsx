import type { NextPage } from "next";
import { Dom } from "~/components/pages/owners/new";
import { CommonMeta } from "~/components/templates/meta";

const AddOwner: NextPage = () => {
  return (
    <>
      <CommonMeta />
      <Dom />
    </>
  );
};
export default AddOwner;
