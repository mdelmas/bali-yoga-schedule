import SelectionBar from "./SelectionBar";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SelectionBar> = {
  component: SelectionBar,
};

export default meta;

type Story = StoryObj<typeof SelectionBar>;

export const Primary: Story = {
  args: {},
};
