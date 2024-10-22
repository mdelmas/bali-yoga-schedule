import DateSelection from "./DateSelection";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DateSelection> = {
  component: DateSelection,
};

export default meta;

type Story = StoryObj<typeof DateSelection>;

export const Primary: Story = {
  args: {},
};
