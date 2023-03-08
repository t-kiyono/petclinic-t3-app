import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { CommonMeta, Page } from "~/components/common";
import { FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";

const FindOwners: NextPage = () => {
  const router = useRouter();

  type FormValues = {
    lastName: string;
  }
  const {
    register,
    handleSubmit
  } = useForm<FormValues>();

  const submit = (data: FormValues) => {
    router.push(`/owners?lastName=${data.lastName}`);
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Find Owners</h2>
      <form onSubmit={handleSubmit(submit)}>
        <FormGroup>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <FormItem>
            <FormInput size={30} maxLength={80} {...register("lastName") } />
          </FormItem>
        </FormGroup>
        <FormGroup reverse>
          <FormItem>
            <Button type="submit">Find Owner</Button>
          </FormItem>
        </FormGroup>
      </form>
      <br />
      <Button onClick={() => router.push("/owners/new")}>Add Owner</Button>
    </Page>
  );
};

export default FindOwners;
