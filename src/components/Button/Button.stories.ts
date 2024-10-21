import Button from "./Button";
import { ButtonType } from "./ButtonParameters";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    type: {
      options: Object.values(ButtonType),
      mapping: Object.values(ButtonType),
      control: {
        type: "select",
        labels: Object.keys(ButtonType),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "label",
    type: ButtonType.FILLED,
  },
};

export const Outlined: Story = {
  args: {
    children: "label",
    type: ButtonType.OUTLINED,
  },
};

export const LightFilled: Story = {
  args: {
    children: "label",
    type: ButtonType.LIGHT_FILLED,
  },
};

export const Clear: Story = {
  args: {
    children: "label",
    type: ButtonType.CLEAR,
  },
};
