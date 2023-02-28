import { Breadcrumb as BreadcrumbComponent } from "./index";

export default {
  component: BreadcrumbComponent,
};

export const Breadcrumb = () => (
  <BreadcrumbComponent>World</BreadcrumbComponent>
);

export const ActiveBreadcrumb = () => (
  <BreadcrumbComponent active>World</BreadcrumbComponent>
);
