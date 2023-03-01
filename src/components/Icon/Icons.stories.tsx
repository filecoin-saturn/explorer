import { Icon as IconComponent } from "./index";

export default {
  title: "Icon",
  component: IconComponent,
};

const Template = (args: any) => <IconComponent {...args} />
export const Icon = Template.bind({});
Icon.args = {
  name: "fil",
  className: 'Stats-icon',
};
