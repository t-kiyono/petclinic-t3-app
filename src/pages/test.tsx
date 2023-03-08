import type { NextPage } from "next";
import { Loader } from "~/components/common";

const Test: NextPage = () => {
  return (
    <div>
      <p>hogehoge</p>
      <Loader />
    </div>
  );
};

export default Test;
