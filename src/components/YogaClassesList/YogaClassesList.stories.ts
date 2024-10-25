import YogaClassesList from "./YogaClassesList";
import moment from "moment";

import type { Meta, StoryObj } from "@storybook/react";
import { TIME } from "../../types/Selection";

const meta: Meta<typeof YogaClassesList> = {
  component: YogaClassesList,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof YogaClassesList>;

export const Primary: Story = {
  args: {
    currentSelection: {
      date: moment(),
      time: TIME.Morning,
    },
  },
};
