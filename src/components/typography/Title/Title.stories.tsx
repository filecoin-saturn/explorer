import { Title as TitleComponent } from "./index";

export default {
  title: "Typography",
  component: TitleComponent,
};

export const Title = () => (
  <TitleComponent>This is a title component.</TitleComponent>
);

export const TitleDimmed = () => (
  <TitleComponent opacity={0.4}>
    This is a title component with 0.4 opacity.
  </TitleComponent>
);

export const TitleBlue = () => (
  <TitleComponent color={"blue"}>
    This is a blue title component.
  </TitleComponent>
);
