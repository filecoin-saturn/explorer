import { Breadcrumb as BreadcrumbComponent } from "./index";

export default {
  name: "Breadcrumb",
  component: BreadcrumbComponent,
};

export const Default = () => (
  <BreadcrumbComponent entity={{ id: "World", name: "World", type: 4 }} />
);

export const Active = () => (
  <BreadcrumbComponent entity={{ id: "eu", name: "Europe", type: 0 }} active />
);
