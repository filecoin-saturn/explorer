import { Breadcrumb as BreadcrumbComponent } from "./index";

export default {
  name: "Breadcrumb",
  component: BreadcrumbComponent,
};

export const Default = () => (
  <BreadcrumbComponent continent="" code="" city="" name="World" />
);

export const Active = () => (
  <BreadcrumbComponent
    continent="Europe"
    code="PT"
    city=""
    name="Portugal"
    active
  />
);
