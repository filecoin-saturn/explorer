import { Stat as StatComponent } from "./index";

export default {
  component: StatComponent,
};

export const Stat = () => (
  <StatComponent value="1,234" units="GB" label="Bandwidth" />
);

export const StatSmall = () => (
  <StatComponent value="1,234" units="GB" label="Bandwidth" small />
);
