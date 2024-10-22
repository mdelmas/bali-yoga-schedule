import TimeSelection from "./TimeSelection";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TimeSelection> = {
  component: TimeSelection,
};

export default meta;

type Story = StoryObj<typeof TimeSelection>;

export const Primary: Story = {
  args: {},
};
