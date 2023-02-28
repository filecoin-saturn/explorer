import { Subtitle as SubtitleComponent } from "./index";

export default {
  title: "Typography",
  component: SubtitleComponent,
};

export const Subtitle = () => (
  <SubtitleComponent>This is a subtitle component.</SubtitleComponent>
);

export const SubtitleDimmed = () => (
  <SubtitleComponent opacity={0.6}>
    This is a subtitle component with 0.6 opacity.
  </SubtitleComponent>
);

export const SubtitleGreen = () => (
  <SubtitleComponent color={"green"}>
    This is a green subtitle component.
  </SubtitleComponent>
);
