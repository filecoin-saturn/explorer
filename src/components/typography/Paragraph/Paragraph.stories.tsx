import { Paragraph as ParagraphComponent } from "./index";

export default {
  title: "Typography",
  component: ParagraphComponent,
};

export const Paragraph = () => (
  <ParagraphComponent>This is a paragraph component.</ParagraphComponent>
);

export const ParagraphDimmed = () => (
  <ParagraphComponent opacity={0.6}>
    This is a paragraph component with 0.6 opacity.
  </ParagraphComponent>
);

export const ParagraphRed = () => (
  <ParagraphComponent color={"red"}>
    This is a red paragraph component.
  </ParagraphComponent>
);
