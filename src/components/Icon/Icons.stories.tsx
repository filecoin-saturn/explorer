import { Icon as IconComponent } from "./index";

export default {
  title: "Icon",
  component: IconComponent,
};

const Template = (args: JSX.IntrinsicAttributes & { name: string; className: string; }) => <IconComponent {...args} />

// export const IconStory = () => <IconComponent name={'fil'} className={'demo'} />;
export const Icon = Template.bind({});
// Icon.args = {
//   name: "nodes",
//   className: "Breadcrumb-icon"
// }
