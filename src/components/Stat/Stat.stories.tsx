import { Stat as StatComponent } from "./index";

export default {
  name: "Stat",
  component: StatComponent,
};

export const Default = () => (
  <StatComponent value="1,234" units="GB" label="Bandwidth" />
);

export const Small = () => (
  <StatComponent value="1,234" units="GB" label="Bandwidth" small />
);
