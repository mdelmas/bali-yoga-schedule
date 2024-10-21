import React from "react";
import type { Preview } from "@storybook/react";
import GlobalStyles from "../src/components/GlobalStyles";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <GlobalStyles />
        <Story />
      </div>
    ),
  ],
};

export default preview;
