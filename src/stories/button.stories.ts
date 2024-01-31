import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "~/components/atoms/button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: "Button",
  },
};
