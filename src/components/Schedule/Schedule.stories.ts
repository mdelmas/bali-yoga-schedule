import Schedule from "./Schedule";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Schedule> = {
  component: Schedule,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Schedule>;

export const Primary: Story = {
  args: {
    classes: new Array(10).fill({
      id: crypto.randomUUID(),
      time: new Date("2024-10-20T08:15:00"),
      duration: 60,
      name: "Sunrise Flow",
      studio: "The Path",
      url: "https://www.thepathyogacenter.com/studio-classes",
    }),
  },
};
