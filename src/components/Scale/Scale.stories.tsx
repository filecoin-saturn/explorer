import { Scale as ScaleComponent } from "./index";

export default {
  name: "Scale",
  component: ScaleComponent,
};

export const Default = () => (
  <ScaleComponent
    higher={{ name: "High", label: "100", color: "#00FFD1" }}
    lower={{ name: "Very Low", label: "5", color: "#113CA9" }}
  />
);
