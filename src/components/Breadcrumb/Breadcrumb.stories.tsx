import { Breadcrumb as BreadcrumbComponent } from "./index";

export default {
  name: "Breadcrumb",
  component: BreadcrumbComponent,
};

export const Default = () => <BreadcrumbComponent>World</BreadcrumbComponent>;

export const Active = () => (
  <BreadcrumbComponent active>World</BreadcrumbComponent>
);
