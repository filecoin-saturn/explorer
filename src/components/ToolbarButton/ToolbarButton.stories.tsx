import {
  ToolbarButton as ToolbarButtonComponent,
  ToolbarButtonProps,
} from "./index";
import { Meta, Story } from "@storybook/react";

export default {
  component: ToolbarButtonComponent,
} as Meta;

const Template: Story<ToolbarButtonProps> = (args) => (
  <ToolbarButtonComponent {...args} />
);
export const ToolbarButton = Template.bind({});
ToolbarButton.args = {
  isActive: false,
  title: "Nodes",
  subtitle: "Cluster",
  onClick: () => {},
  iconName: "Nodes",
};
