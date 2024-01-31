import type { Meta, StoryObj } from "@storybook/react";

import {
  FormErrorMessage,
  FormGroup,
  FormInput,
  FormItem,
  FormLabel,
  FormSelect
} from "~/components/atoms/form";

const meta = {
  title: "Form",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  render: () => (
    <FormGroup>
      <FormLabel htmlFor="firstName">First Name</FormLabel>
      <FormItem>
        <FormInput id="firstName" defaultValue="John" />
      </FormItem>
    </FormGroup>
  ),
};

type SelectProps = { items: string[] };

export const Select: StoryObj<SelectProps> = {
  args: {
    items: ["dog", "cat", "hamster"]
  },
  render: ({ items }) => (
    <FormGroup>
      <FormLabel htmlFor="petType">Pet type</FormLabel>
      <FormItem>
        <FormSelect id="petType">
          {
            items.map((value, index) => (
              <option key={index}>{value}</option>
            ))
          }
        </FormSelect>
      </FormItem>
    </FormGroup>
  ),
};

export const Error: Story = {
  render: () => (
    <FormGroup>
      <FormLabel htmlFor="firstName">First Name</FormLabel>
      <FormItem>
        <FormInput id="firstName" />
        <FormErrorMessage>This is required</FormErrorMessage>
      </FormItem>
    </FormGroup>
  ),
};
