import { Body as BodyComponent } from "./index";

export default {
  title: "Typography",
  component: BodyComponent,
};

export const Body = () => (
  <BodyComponent>This is a body component.</BodyComponent>
);

export const BodyDimmed = () => (
  <BodyComponent opacity={0.6}>
    This is a body component with 0.6 opacity.
  </BodyComponent>
);

export const BodyRed = () => (
  <BodyComponent color={"red"}>This is a red body component.</BodyComponent>
);
