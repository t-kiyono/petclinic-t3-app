import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { CommonMeta, Loader, Page } from "~/components/common";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";
import { api } from "~/utils/api";

interface EditOwnerProps {
  oid: number;
}
const EditOwner: NextPage<EditOwnerProps> = ({ oid }) => {
  const { data, isLoading } = api.owners.show.useQuery(oid);

  const dataRender = () => {
    if (isLoading || !data) return <Loader />;

    const owner = {
      id: data.id,
      firstName: data.first_name ?? "",
      lastName: data.last_name ?? "",
      address: data.address ?? "",
      city: data.city ?? "",
      telephone: data.telephone ?? "",
    };
    return <EditData owner={owner} />;
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Owner</h2>
      {dataRender()}
    </Page>
  );
};

export default EditOwner;

interface EditDataProps {
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
  };
}
function EditData({ owner }: EditDataProps) {
  const mutation = api.owners.update.useMutation();
  const router = useRouter();

  type FormValues = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
  }
  const {
    handleSubmit,
    register,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const submit = (data: FormValues) => {
    mutation.mutate({ ...data, id: owner.id }, {
      onSuccess: data => router.push(`/owners/${data.id}`),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <FormItem>
          <FormInput id="firstName" defaultValue={owner.firstName} {...register("firstName", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.firstName && (errors.firstName.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <FormItem>
          <FormInput id="lastName" defaultValue={owner.lastName} {...register("lastName", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.lastName && (errors.lastName.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="address">Address</FormLabel>
        <FormItem>
          <FormInput id="address" defaultValue={owner.address} {...register("address", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.address && (errors.address.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="city">City</FormLabel>
        <FormItem>
          <FormInput id="city" defaultValue={owner.city} {...register("city", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.city && (errors.city.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="telephone">Telephone</FormLabel>
        <FormItem>
          <FormInput id="telephone" defaultValue={owner.telephone} {...register("telephone", {
            required: "This is required",
          })} />
          <FormErrorMessage>
            {errors.telephone && (errors.telephone.message ?? "")}
          </FormErrorMessage>
        </FormItem>
      </FormGroup>
      <FormGroup reverse>
        <FormItem>
          <Button type="submit" disabled={isSubmitting}>Update Owner</Button>
        </FormItem>
      </FormGroup>
    </form>
  );
}

export function getServerSideProps({ params }: GetServerSidePropsContext) {
  if (!params) throw new Error("Illegal route params");
  const oid = parseInt(params.oid as string);
  const props: EditOwnerProps = {
    oid,
  };
  return { props };
}
