import { Icon as IconComponent, IconProps } from "./index";
import {Meta, Story} from '@storybook/react'

export default {
  title: "Icon",
  component: IconComponent,
} as Meta;

const Template: Story<IconProps> = (args) => <IconComponent {...args} />

export const Icon = Template.bind({});
Icon.args = {
  name: "fil",
  className: 'Stats-icon',
};
