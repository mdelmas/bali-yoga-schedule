import Button from "./Button";
import { ButtonSize, ButtonVariant } from "./ButtonParameters";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      mapping: Object.values(ButtonVariant),
      control: {
        type: "select",
        labels: Object.keys(ButtonVariant),
      },
    },
    size: {
      options: Object.values(ButtonSize),
      mapping: Object.values(ButtonSize),
      control: {
        type: "select",
        labels: Object.keys(ButtonSize),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "label",
    variant: ButtonVariant.FILLED,
  },
};

export const Outlined: Story = {
  args: {
    children: "label",
    variant: ButtonVariant.OUTLINED,
  },
};

export const LightFilled: Story = {
  args: {
    children: "label",
    variant: ButtonVariant.LIGHT_FILLED,
  },
};

export const Clear: Story = {
  args: {
    children: "label",
    variant: ButtonVariant.CLEAR,
  },
};
