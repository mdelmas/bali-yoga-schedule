import Schedule from "./Schedule";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Schedule> = {
  component: Schedule,
};

export default meta;

type Story = StoryObj<typeof Schedule>;

export const Primary: Story = {
  args: {},
};
