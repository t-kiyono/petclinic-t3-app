import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { CommonMeta, Page } from "~/components/common";
import { FormErrorMessage, FormGroup, FormInput, FormItem, FormLabel } from "~/components/form";
import { api } from "~/utils/api";

const AddOwner: NextPage = () => {
  const router = useRouter();
  const mutation = api.owners.create.useMutation();

  type FormValues = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
  };
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
    mutation.mutate(data, {
      onSuccess: (data => router.push(`/owners/${data.id}`)),
    });
  };

  return (
    <Page>
      <CommonMeta />
      <h2>Add Owner</h2>
      <form onSubmit={handleSubmit(submit)}>
        <FormGroup>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <FormItem>
            <FormInput {...register("firstName", {
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
            <FormInput {...register("lastName", {
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
            <FormInput {...register("address", {
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
            <FormInput {...register("city", {
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
            <FormInput {...register("telephone", {
              required: "This is required",
            })} />
            <FormErrorMessage>
              {errors.telephone && (errors.telephone.message ?? "")}
            </FormErrorMessage>
          </FormItem>
        </FormGroup>
        <FormGroup reverse>
          <FormItem>
            <Button type="submit" disabled={isSubmitting}>Add Owner</Button>
          </FormItem>
        </FormGroup>
      </form>
    </Page>
  );
};

export default AddOwner;
