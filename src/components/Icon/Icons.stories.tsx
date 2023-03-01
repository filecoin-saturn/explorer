import { Icon as IconComponent } from "./index";

export default {
  title: "Icon",
  component: IconComponent,
};

const Template = (args: { name: string; className: string; }) => <IconComponent {...args} />
export const Icon = Template.bind({});
