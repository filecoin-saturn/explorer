import { Icon as IconComponent, IconProps } from "./index";
import {Meta, Story} from '@storybook/react'

export default {
  component: IconComponent,
} as Meta;

const Template: Story<IconProps> = (args) => <IconComponent {...args} />

export const Icon = Template.bind({});
Icon.args = {
  iconPath: "icons/fil",
  className: 'Stats-icon',
};
