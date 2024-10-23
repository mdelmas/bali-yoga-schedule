import ScheduleLine from "./ScheduleLine";
import moment from "moment";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ScheduleLine> = {
  component: ScheduleLine,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ScheduleLine>;

export const Primary: Story = {
  args: {
    // time: new Date("2024-10-20T08:15:00"),
    time: moment("1995-10-20 08:15"),
    duration: 60,
    name: "Sunrise Flow",
    studio: "The Path",
    url: "https://www.thepathyogacenter.com/studio-classes",
  },
};
